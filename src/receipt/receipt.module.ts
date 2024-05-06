import { Module } from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { ReceiptController } from './receipt.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { OrderItemsModule } from '../order_items/order_items.module';
import { OrderModule } from '../order/order.module';
import { MenuItemsModule } from '../menu_items/menu_items.module';
import { FoodCategoryModule } from '../food_category/food_category.module';
import { TableModule } from '../table/table.module';

@Module({
  imports: [PrismaModule, OrderModule, OrderItemsModule, MenuItemsModule, MenuItemsModule, FoodCategoryModule, TableModule],
  controllers: [ReceiptController],
  providers: [ReceiptService],

})
export class ReceiptModule {}
