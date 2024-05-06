import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Order } from '@prisma/client';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('order')
@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  private async updateTableAvailability(
    tableId: number,
    isAvailable: boolean,
  ): Promise<void> {
    await this.prismaService.table.update({
      where: {
        id: tableId,
      },
      data: {
        isAvailable,
      },
    });
  }

  @ApiOperation({ summary: 'Create an order' })
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = await this.prismaService.order.create({
      data: {
        tableId: createOrderDto.tableId,
        customerId: createOrderDto.customerId,
        employeeId: createOrderDto.employeeId,
        status: createOrderDto.status,
        order_date: createOrderDto.order_date,
      },
    });

    // Update table availability
    await this.updateTableAvailability(createOrderDto.tableId, false);

    return order;
  }

  @ApiOperation({ summary: 'Get all orders' })
  async findAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({
      include: {
        Table: true,
        Customer: true,
        Employee: {
          include: {
            Role: true,
          },
        },
      },
    });
  }

  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Order ID' })
  async findOne(id: number): Promise<Order | null> {
    const order = await this.prismaService.order.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  @ApiOperation({ summary: 'Update an order by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Order ID' })
  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const existingOrder = await this.prismaService.order.findUnique({
      where: {
        id,
      },
    });

    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return this.prismaService.order.update({
      where: {
        id,
      },
      data: {
        tableId: updateOrderDto.tableId,
        customerId: updateOrderDto.customerId,
        employeeId: updateOrderDto.employeeId,
        status: updateOrderDto.status,
        order_date: updateOrderDto.order_date,
      },
    });
  }

  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Order ID' })
  async remove(id: number): Promise<void> {
    const existingOrder = await this.prismaService.order.findUnique({
      where: {
        id,
      },
    });

    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    await this.prismaService.order.delete({
      where: {
        id,
      },
    });
  }
}
