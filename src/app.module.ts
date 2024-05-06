import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { EmployeeModule } from './employee/employee.module';
import { PaymentTypeModule } from './payment_type/payment_type.module';
import { PaymentModule } from './payment/payment.module';
import { CutomerModule } from './cutomer/cutomer.module';
import { TableModule } from './table/table.module';
import { FoodCategoryModule } from './food_category/food_category.module';
import { MenuItemsModule } from './menu_items/menu_items.module';
import { OrderItemsModule } from './order_items/order_items.module';
import { OrderModule } from './order/order.module';
import { ReceiptModule } from './receipt/receipt.module';
import { MailModule } from './mail/mail.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    PrismaModule,
    AdminModule,
    AuthModule,
    RoleModule,
    EmployeeModule,
    PaymentTypeModule,
    PaymentModule,
    CutomerModule,
    TableModule,
    FoodCategoryModule,
    MenuItemsModule,
    OrderItemsModule,
    OrderModule,
    ReceiptModule,
    MailModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
