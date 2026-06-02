import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class TelegramService {
  private botToken: string;
  private api: AxiosInstance;

  constructor(private configService: ConfigService) {
    this.botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN') || '';
    this.api = axios.create({
      baseURL: `https://api.telegram.org/bot${this.botToken}/`,
    });
  }

  async sendMessage(chatId: string, message: string): Promise<boolean> {
    if (!this.botToken || this.botToken.includes('your-telegram')) {
      console.log('Telegram bot token not configured. Skipping notification.');
      return false;
    }

    if (!chatId || chatId === '') {
      console.log('Telegram chat ID not provided. Skipping notification.');
      return false;
    }

    try {
      const response = await this.api.post('sendMessage', {
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      });
      console.log('Telegram message sent successfully to chat ID:', chatId);
      return true;
    } catch (error) {
      console.error('Failed to send Telegram message:', error.response?.data || error.message);
      return false;
    }
  }

  async sendBinFullNotification(bin: any, responsiblePerson: any): Promise<boolean> {
    // Skip if no valid telegram ID
    if (!responsiblePerson?.telegramId || responsiblePerson.telegramId.startsWith('@')) {
      console.log('Skipping Telegram notification: Invalid or missing chat ID');
      return false;
    }

    const message = this.formatBinFullMessage(bin);
    return await this.sendMessage(responsiblePerson.telegramId, message);
  }

  private formatBinFullMessage(bin: any): string {
    const fullnessPercentage = bin.fullnessPercentage ?? 0;
    const urgency = this.getUrgencyLabel(fullnessPercentage);

    let message = `
🗑️ <b>Контейнер заполнен!</b>

${urgency}

📍 <b>Место:</b> ${bin.location}
🏷️ <b>QR-код:</b> ${bin.qrCode}
📁 <b>Категория:</b> ${bin.category?.icon || ''} ${bin.category?.name || ''}
📊 <b>Заполненность:</b> ${fullnessPercentage}%
⏰ <b>Время:</b> ${new Date().toLocaleString('ru-KZ')}
`;

    // Add map link if coordinates are available
    if (bin.latitude && bin.longitude) {
      message += `\n🗺️ <a href="https://www.google.com/maps?q=${bin.latitude},${bin.longitude}">Показать на карте</a>`;
    }

    message += `

Пожалуйста, proceed to collect the waste.

---
<i>Smart Waste System</i>`;

    return message.trim();
  }

  private getUrgencyLabel(percentage: number): string {
    if (percentage >= 95) return '🚨 <b>СРОЧНО!</b> Контейнер переполнен.';
    if (percentage >= 85) return '⚠️ Контейнер заполнен, требуется вывоз.';
    return '📢 Контейнер скоро будет заполнен.';
  }

  async sendBinEmptiedNotification(bin: any, responsiblePerson: any): Promise<boolean> {
    const fullnessPercentage = bin.fullnessPercentage ?? 0;

    const message = `
✅ <b>Контейнер очищен</b>

Контейнер по адресу ${bin.location} опустошен и готов к использованию.

🏷️ <b>QR-код:</b> ${bin.qrCode}
📊 <b>Заполненность:</b> ${fullnessPercentage}%
⏰ <b>Время:</b> ${new Date().toLocaleString('ru-KZ')}

---
<i>Smart Waste System</i>
    `.trim();
    return await this.sendMessage(responsiblePerson.telegramId, message);
  }

  formatChatId(telegramId: string): string {
    // Remove @ if present
    return telegramId.startsWith('@') ? telegramId : `@${telegramId}`;
  }
}
