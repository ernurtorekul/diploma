import { Module } from '@nestjs/common';
import { ResponsiblePersonsService } from './responsible-persons.service';
import { ResponsiblePersonsController } from './responsible-persons.controller';

@Module({
  controllers: [ResponsiblePersonsController],
  providers: [ResponsiblePersonsService],
  exports: [ResponsiblePersonsService],
})
export class ResponsiblePersonsModule {}
