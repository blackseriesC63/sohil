import { Module } from '@nestjs/common';
import { FoodCategoryService } from './food_category.service';
import { FoodCategoryController } from './food_category.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [FoodCategoryController],
  providers: [FoodCategoryService],
  exports: [FoodCategoryService],
})
export class FoodCategoryModule {}
