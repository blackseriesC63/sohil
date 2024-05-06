import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentTypeDto } from './dto/create-payment_type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment_type.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Payment_type } from '@prisma/client';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'; // Import Swagger decorators

@ApiTags('Payment Type') // Specify the Swagger tag for this service
@Injectable()
export class PaymentTypeService {
  constructor(private readonly prismaService: PrismaService) {}

  @ApiOkResponse({ description: 'Payment type created successfully' })
  async create(
    createPaymentTypeDto: CreatePaymentTypeDto,
  ): Promise<Payment_type> {
    return this.prismaService.payment_type.create({
      data: {
        payment_type: createPaymentTypeDto.payment_type,
      },
    });
  }

  @ApiOkResponse({
    description: 'List of all payment types',
  })
  async findAll(): Promise<Payment_type[]> {
    return this.prismaService.payment_type.findMany();
  }

  @ApiOkResponse({ description: 'Payment type found' })
  @ApiNotFoundResponse({ description: 'Payment type not found' })
  async findOne(id: number): Promise<Payment_type | null> {
    const paymentType = await this.prismaService.payment_type.findUnique({
      where: {
        id,
      },
    });

    if (!paymentType) {
      throw new NotFoundException(`Payment type with ID ${id} not found`);
    }

    return paymentType;
  }

  @ApiOkResponse({ description: 'Payment type updated successfully' })
  @ApiNotFoundResponse({ description: 'Payment type not found' })
  async update(
    id: number,
    updatePaymentTypeDto: UpdatePaymentTypeDto,
  ): Promise<Payment_type> {
    const existingPaymentType =
      await this.prismaService.payment_type.findUnique({
        where: {
          id,
        },
      });

    if (!existingPaymentType) {
      throw new NotFoundException(`Payment type with ID ${id} not found`);
    }

    return this.prismaService.payment_type.update({
      where: {
        id,
      },
      data: {
        payment_type: updatePaymentTypeDto.payment_type,
      },
    });
  }

  @ApiOkResponse({ description: 'Payment type deleted successfully' })
  @ApiNotFoundResponse({ description: 'Payment type not found' })
  async remove(id: number): Promise<void> {
    const existingPaymentType =
      await this.prismaService.payment_type.findUnique({
        where: {
          id,
        },
      });

    if (!existingPaymentType) {
      throw new NotFoundException(`Payment type with ID ${id} not found`);
    }

    await this.prismaService.payment_type.delete({
      where: {
        id,
      },
    });
  }
}
