import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Payment } from '.prisma/client'; // Import the Payment model from Prisma
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'; // Import Swagger decorators

@ApiTags('Payment') // Specify the Swagger tag for this controller
@Injectable()
export class PaymentService {
  constructor(private readonly prismaService: PrismaService) {}

  @ApiOkResponse({ description: 'Payment created successfully' })
  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.prismaService.payment.create({
      data: {
        recieptId: createPaymentDto.recieptId,
      },
    });
  }

  @ApiOkResponse({ description: 'List of all payments' })
  async findAll(): Promise<Payment[]> {
    return this.prismaService.payment.findMany({
      include: {
        Reciept: true,
      },
    });
  }

  @ApiOkResponse({ description: 'Payment found' })
  @ApiNotFoundResponse({ description: 'Payment not found' })
  async findOne(id: number): Promise<Payment | null> {
    const payment = await this.prismaService.payment.findUnique({
      where: {
        id,
      },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }

  @ApiOkResponse({ description: 'Payment updated successfully' })
  @ApiNotFoundResponse({ description: 'Payment not found' })
  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    const existingPayment = await this.prismaService.payment.findUnique({
      where: {
        id,
      },
    });

    if (!existingPayment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return this.prismaService.payment.update({
      where: {
        id,
      },
      data: {
        recieptId: updatePaymentDto.recieptId,
      },
    });
  }

  @ApiOkResponse({ description: 'Payment deleted successfully' })
  @ApiNotFoundResponse({ description: 'Payment not found' })
  async remove(id: number): Promise<void> {
    const existingPayment = await this.prismaService.payment.findUnique({
      where: {
        id,
      },
    });

    if (!existingPayment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    await this.prismaService.payment.delete({
      where: {
        id,
      },
    });
  }
}
