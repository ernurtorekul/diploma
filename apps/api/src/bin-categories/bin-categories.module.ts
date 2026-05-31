import { Module } from '@nestjs/common';
import { BinCategoriesService } from './bin-categories.service';
import { BinCategoriesController } from './bin-categories.controller';

@Module({
  controllers: [BinCategoriesController],
  providers: [BinCategoriesService],
  exports: [BinCategoriesService],
})
export class BinCategoriesModule {}
