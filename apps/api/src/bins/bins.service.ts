import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import axios from 'axios';

interface GeolocationCache {
  location: { lat: number; lng: number };
  timestamp: number;
}

@Injectable()
export class BinsService {
  private readonly logger = new Logger(BinsService.name);
  private geolocationCache = new Map<string, GeolocationCache>();
  private readonly GEOLOCATION_CACHE_TTL = 10 * 60 * 1000; // 10 minutes in milliseconds

  constructor(
    private prisma: PrismaService,
    private telegramService: TelegramService,
    private configService: ConfigService
  ) {}

  async findAll() {
    return this.prisma.bin.findMany({
      include: {
        area: {
          include: {
            responsiblePerson: true,
          },
        },
        category: true,
        _count: {
          select: { classifications: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.bin.findUnique({
      where: { id },
      include: {
        area: {
          include: {
            responsiblePerson: true,
          },
        },
        category: true,
        _count: {
          select: { classifications: true },
        },
      },
    });
  }

  async findByQrCode(qrCode: string) {
    return this.prisma.bin.findUnique({
      where: { qrCode },
      include: {
        area: {
          include: {
            responsiblePerson: true,
          },
        },
        category: true,
      },
    });
  }

  async create(data: {
    qrCode: string;
    location: string;
    areaId: string;
    categoryId: string;
  }) {
    return this.prisma.bin.create({
      data,
      include: {
        area: {
          include: {
            responsiblePerson: true,
          },
        },
        category: true,
      },
    });
  }

  async update(
    id: string,
    data: {
      location?: string;
      areaId?: string;
      categoryId?: string;
      isFull?: boolean;
    }
  ) {
    return this.prisma.bin.update({
      where: { id },
      data,
      include: {
        area: {
          include: {
            responsiblePerson: true,
          },
        },
        category: true,
      },
    });
  }

  async remove(id: string) {
    // Use a transaction to ensure all deletes happen together
    return await this.prisma.$transaction(async (tx) => {
      // First, delete related classifications
      await tx.classification.deleteMany({
        where: { binId: id },
      });

      // Then delete related notifications
      await tx.notification.deleteMany({
        where: { binId: id },
      });

      // Finally delete the bin
      return await tx.bin.delete({
        where: { id },
      });
    });
  }

  async updateFullness(id: string, percentage: number, wifiNetworks?: any[]) {
    const bin = await this.prisma.bin.findUnique({
      where: { id },
      include: {
        area: {
          include: {
            responsiblePerson: true,
          },
        },
        category: true,
      },
    });

    if (!bin) {
      throw new Error('Bin not found');
    }

    // Determine if bin is full based on threshold
    const isFull = percentage >= (bin.fullnessThreshold ?? 85);
    const wasFull = bin.isFull;

    // If WiFi networks provided, get geolocation (with rate limiting)
    let latitude = bin.latitude;
    let longitude = bin.longitude;

    if (wifiNetworks && wifiNetworks.length > 0) {
      try {
        // Check cache first
        const cached = this.geolocationCache.get(id);
        const now = Date.now();

        if (cached && (now - cached.timestamp) < this.GEOLOCATION_CACHE_TTL) {
          // Use cached location
          latitude = cached.location.lat;
          longitude = cached.location.lng;
          this.logger.debug(`Using cached geolocation for bin ${id}`);
        } else {
          // Call Google Geolocation API
          const location = await this.getGeolocationFromWifi(wifiNetworks);
          if (location) {
            latitude = location.lat;
            longitude = location.lng;

            // Update cache
            this.geolocationCache.set(id, {
              location,
              timestamp: now,
            });
          }
        }
      } catch (error) {
        console.error('Failed to get geolocation:', error);
        // Continue with existing coordinates
      }
    }

    // Update bin with new percentage, status, and possibly location
    const updatedBin = await this.prisma.bin.update({
      where: { id },
      data: {
        fullnessPercentage: percentage,
        isFull,
        lastFullnessUpdate: new Date(),
        ...(latitude !== undefined && longitude !== undefined && {
          latitude,
          longitude,
        }),
      },
    });

    // Send notification if bin became full (crossed threshold)
    if (isFull && !wasFull && bin.area?.responsiblePerson) {
      // Pass updated bin data to Telegram service
      await this.telegramService.sendBinFullNotification(updatedBin, bin.area.responsiblePerson);

      // Create notification record
      await this.prisma.notification.create({
        data: {
          type: 'BIN_FULL',
          message: `Контейнер по адресу ${bin.location} заполнен на ${percentage}%. Требуется вывоз.`,
          binId: id,
          status: 'SENT',
        },
      });
    }

    // Send notification if bin was emptied (crossed below threshold)
    if (!isFull && wasFull && bin.area?.responsiblePerson) {
      await this.telegramService.sendBinEmptiedNotification(updatedBin, bin.area.responsiblePerson);

      await this.prisma.notification.create({
        data: {
          type: 'BIN_EMPTIED',
          message: `Контейнер по адресу ${bin.location} опустошен. Текущий уровень: ${percentage}%.`,
          binId: id,
          status: 'SENT',
        },
      });
    }

    return updatedBin;
  }

  private async getGeolocationFromWifi(wifiNetworks: any[]): Promise<{ lat: number; lng: number } | null> {
    const apiKey = this.configService.get<string>('GOOGLE_GEOLOCATION_API_KEY');

    if (!apiKey || apiKey === 'your-google-api-key') {
      this.logger.warn('Google Geolocation API key not configured. Skipping geolocation.');
      return null;
    }

    try {
      const response = await axios.post(
        `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`,
        {
          considerIp: false,
          wifiAccessPoints: wifiNetworks.map((network) => ({
            macAddress: network.macAddress,
            signalStrength: network.signalStrength,
          })),
        },
      );

      if (response.data && response.data.location) {
        const { lat, lng } = response.data.location;
        const accuracy = response.data.accuracy;

        this.logger.log(`Geolocation obtained: ${lat}, ${lng} (accuracy: ${accuracy}m)`);

        return { lat, lng };
      }

      return null;
    } catch (error) {
      this.logger.error('Google Geolocation API error:', error.response?.data || error.message);
      return null;
    }
  }
}
