import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create Admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@smartwaste.kz' },
    update: {},
    create: {
      email: 'admin@smartwaste.kz',
      password: hashedPassword,
    },
  });
  console.log('✅ Admin created:', admin.email);

  // Create Bin Categories
  const recyclable = await prisma.binCategory.upsert({
    where: { id: 'default-recyclable' },
    update: {},
    create: {
      id: 'default-recyclable',
      name: 'Recyclable',
      color: '#10B981',
      icon: '♻️',
    },
  });

  const general = await prisma.binCategory.upsert({
    where: { id: 'default-general' },
    update: {},
    create: {
      id: 'default-general',
      name: 'General Trash',
      color: '#6B7280',
      icon: '🗑️',
    },
  });

  const organic = await prisma.binCategory.upsert({
    where: { id: 'default-organic' },
    update: {},
    create: {
      id: 'default-organic',
      name: 'Organic Waste',
      color: '#84CC16',
      icon: '🌱',
    },
  });

  const glass = await prisma.binCategory.upsert({
    where: { id: 'default-glass' },
    update: {},
    create: {
      id: 'default-glass',
      name: 'Glass',
      color: '#3B82F6',
      icon: '🍾',
    },
  });

  console.log('✅ Categories created:', recyclable.name, general.name, organic.name, glass.name);

  // Create Area
  const area = await prisma.area.upsert({
    where: { id: 'default-area' },
    update: {},
    create: {
      id: 'default-area',
      name: 'Almaty City Center',
    },
  });
  console.log('✅ Area created:', area.name);

  // Create Responsible Person
  const person = await prisma.responsiblePerson.upsert({
    where: { areaId: area.id },
    update: {},
    create: {
      name: 'Aibek Smailov',
      telegramId: '@aibek_sm',
      areaId: area.id,
    },
  });
  console.log('✅ Responsible person created:', person.name);

  // Create Bins
  const bin1 = await prisma.bin.upsert({
    where: { id: '9c4bdac7-3d02-4e70-b852-1e60e4e03ab8' },
    update: {},
    create: {
      id: '9c4bdac7-3d02-4e70-b852-1e60e4e03ab8',
      qrCode: 'BIN-ALM-001',
      location: 'Panfilov Street, near Central Park',
      areaId: area.id,
      categoryId: recyclable.id,
    },
  });

  const bin2 = await prisma.bin.upsert({
    where: { qrCode: 'BIN-ALM-002' },
    update: {},
    create: {
      qrCode: 'BIN-ALM-002',
      location: 'Republic Square, main entrance',
      areaId: area.id,
      categoryId: general.id,
    },
  });

  const bin3 = await prisma.bin.upsert({
    where: { qrCode: 'BIN-ALM-003' },
    update: {},
    create: {
      qrCode: 'BIN-ALM-003',
      location: 'Dostyk Avenue, near mall',
      areaId: area.id,
      categoryId: organic.id,
    },
  });

  const bin4 = await prisma.bin.upsert({
    where: { qrCode: 'BIN-ALM-004' },
    update: {},
    create: {
      qrCode: 'BIN-ALM-004',
      location: 'Tulebaev Street, residential area',
      areaId: area.id,
      categoryId: glass.id,
    },
  });

  console.log('✅ Bins created:', bin1.qrCode, bin2.qrCode, bin3.qrCode, bin4.qrCode);

  // Create demo user
  const user = await prisma.user.upsert({
    where: { telegramId: '@ernur_t' },
    update: {},
    create: {
      telegramId: '@ernur_t',
      phoneNumber: '+77001234567',
      ecoPoints: 150,
    },
  });
  console.log('✅ Demo user created:', user.telegramId);

  // Create demo classifications
  await prisma.classification.create({
    data: {
      imageUrl: 'https://example.com/bottle.jpg',
      result: 'Plastic Bottle - Recyclable',
      confidence: 0.95,
      pointsEarned: 10,
      binId: bin1.id,
      userId: user.id,
    },
  });

  console.log('✅ Demo classification created');

  console.log('🎉 Seed completed successfully!');
  console.log('');
  console.log('📝 Login credentials:');
  console.log('   Email: admin@smartwaste.kz');
  console.log('   Password: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
