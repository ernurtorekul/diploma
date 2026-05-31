import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { BinsModule } from './bins/bins.module';
import { BinCategoriesModule } from './bin-categories/bin-categories.module';
import { AreasModule } from './areas/areas.module';
import { ResponsiblePersonsModule } from './responsible-persons/responsible-persons.module';
import { ClassificationsModule } from './classifications/classifications.module';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    CommonModule,
    AuthModule,
    BinsModule,
    BinCategoriesModule,
    AreasModule,
    ResponsiblePersonsModule,
    ClassificationsModule,
    UsersModule,
    NotificationsModule,
    TelegramModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
