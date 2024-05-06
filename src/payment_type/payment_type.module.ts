import { Module } from '@nestjs/common';
import { PaymentTypeService } from './payment_type.service';
import { PaymentTypeController } from './payment_type.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PaymentTypeController],
  providers: [PaymentTypeService],
})
export class PaymentTypeModule {}
