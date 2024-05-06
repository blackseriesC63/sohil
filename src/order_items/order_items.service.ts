import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Order_items } from '@prisma/client';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('order-items')
@Injectable()
export class OrderItemsService {
  constructor(private readonly prismaService: PrismaService) {}

  @ApiOperation({ summary: 'Create an order item' })
  async create(createOrderItemDto: CreateOrderItemDto): Promise<Order_items> {
    return this.prismaService.order_items.create({
      data: {
        menu_itemsId: createOrderItemDto.menu_itemsId,
        quantity: createOrderItemDto.quantity,
        orderId: createOrderItemDto.orderId,
        comments: createOrderItemDto.comments,
      },
    });
  }

  async findAllByOrderId(orderId: number): Promise<Order_items[]> {
    return this.prismaService.order_items.findMany({
      where: {
        orderId,
      },
      include: {
        Menu_items: true,
      },
    });
  }

  @ApiOperation({ summary: 'Get all order items' })
  async findAll(): Promise<Order_items[]> {
    return this.prismaService.order_items.findMany({
      include: {
        Order: {
          include: {
            Table: true,
            Customer: true,
          },
        },
        Menu_items: {
          include: {
            Food_category: true,
          },
        },
      },
    });
  }

  @ApiOperation({ summary: 'Get an order item by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Order item ID' })
  async findOne(id: number): Promise<Order_items | null> {
    const orderItem = await this.prismaService.order_items.findUnique({
      where: {
        id,
      },
    });

    if (!orderItem) {
      throw new NotFoundException(`Order item with ID ${id} not found`);
    }

    return orderItem;
  }

  @ApiOperation({ summary: 'Update an order item by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Order item ID' })
  async update(
    id: number,
    updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<Order_items> {
    const existingOrderItem = await this.prismaService.order_items.findUnique({
      where: {
        id,
      },
    });

    if (!existingOrderItem) {
      throw new NotFoundException(`Order item with ID ${id} not found`);
    }

    return this.prismaService.order_items.update({
      where: {
        id,
      },
      data: {
        menu_itemsId: updateOrderItemDto.menu_itemsId,
        quantity: updateOrderItemDto.quantity,
        orderId: updateOrderItemDto.orderId,
        comments: updateOrderItemDto.comments,
      },
    });
  }

  @ApiOperation({ summary: 'Delete an order item by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Order item ID' })
  async remove(id: number): Promise<void> {
    const existingOrderItem = await this.prismaService.order_items.findUnique({
      where: {
        id,
      },
    });

    if (!existingOrderItem) {
      throw new NotFoundException(`Order item with ID ${id} not found`);
    }

    await this.prismaService.order_items.delete({
      where: {
        id,
      },
    });
  }
}
