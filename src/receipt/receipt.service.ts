import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Order, Reciept } from '@prisma/client';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'; // Import Swagger decorators
import { OrderService } from '../order/order.service';
import { OrderItemsService } from '../order_items/order_items.service';
import { MenuItemsService } from '../menu_items/menu_items.service';
import { FoodCategoryService } from '../food_category/food_category.service';
import { TableService } from '../table/table.service';

@ApiTags('Receipt') // Specify the Swagger tag for this service
@Injectable()
export class ReceiptService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly orderService: OrderService,
    private readonly orderItemsService: OrderItemsService,
    private readonly foodCategoriesService: FoodCategoryService,
    private readonly menuItemsService: MenuItemsService,
    private readonly tableService: TableService,
  ) {}

  async calculateTotalPrice(orderId: number): Promise<number> {
    const orderItems = await this.orderItemsService.findAllByOrderId(orderId);

    // Calculate the total price by iterating through order items and summing their individual prices multiplied by quantity
    let totalPrice = 0;
    for (const orderItem of orderItems) {
      const menuItem = await this.menuItemsService.findOne(
        orderItem.menu_itemsId,
      );
      if (menuItem) {
        totalPrice += menuItem.price * orderItem.quantity;
      }
    }
    return totalPrice;
  }

  async create(createReceiptDto: CreateReceiptDto): Promise<Reciept> {
    const createdReceipt = await this.prismaService.reciept.create({
      data: {
        orderId: createReceiptDto.orderId,
        payment_typeId: createReceiptDto.payment_typeId,
        total_price: await this.calculateTotalPrice(createReceiptDto.orderId),
      },
    });

    // Retrieve order items associated with the orderId
    const orderItems = await this.orderItemsService.findAllByOrderId(
      createReceiptDto.orderId,
    );

    console.log('Order items associated with orderId', orderItems);

    const order = await this.orderService.findOne(createReceiptDto.orderId);
    if (order) {
      await this.tableService.updateTableAvailability(order.tableId, true);
    }

    return createdReceipt;
  }

  @ApiOkResponse({ description: 'List of all receipts' })
  async findAll(): Promise<Reciept[]> {
    const receipts = await this.prismaService.reciept.findMany({
      include: {
        Order: {
          include: {
            order_id: {
              include: {
                Menu_items: true,
              },
            },
          },
        },
      },
    });

    for (const receipt of receipts) {
      const totalPrice = await this.calculateTotalPrice(receipt.orderId);
      receipt.total_price = totalPrice;
    }
    return receipts;
  }

  @ApiOkResponse({ description: 'Receipt found' })
  @ApiNotFoundResponse({ description: 'Receipt not found' })
  @ApiOkResponse({ description: 'Receipt found' })
  @ApiNotFoundResponse({ description: 'Receipt not found' })
  async findOne(id: number): Promise<Reciept | null> {
    const receipt = await this.prismaService.reciept.findUnique({
      where: {
        id,
      },
      include: {
        Order: {
          include: {
            order_id: {
              include: {
                Menu_items: true,
              },
            },
          },
        },
      },
    });

    if (!receipt) {
      throw new NotFoundException(`Receipt with ID ${id} not found`);
    }

    const totalPrice = await this.calculateTotalPrice(receipt.orderId);

    receipt.total_price = totalPrice;

    return receipt;
  }

  @ApiOkResponse({ description: 'Receipt updated successfully' })
  @ApiNotFoundResponse({ description: 'Receipt not found' })
  async update(
    id: number,
    updateReceiptDto: UpdateReceiptDto,
  ): Promise<Reciept> {
    const existingReceipt = await this.prismaService.reciept.findUnique({
      where: {
        id,
      },
    });

    if (!existingReceipt) {
      throw new NotFoundException(`Receipt with ID ${id} not found`);
    }

    return this.prismaService.reciept.update({
      where: {
        id,
      },
      data: {
        payment_typeId: updateReceiptDto.payment_typeId,
        orderId: updateReceiptDto.orderId,
      },
    });
  }

  @ApiOkResponse({ description: 'Receipt deleted successfully' })
  @ApiNotFoundResponse({ description: 'Receipt not found' })
  async remove(id: number): Promise<void> {
    const existingReceipt = await this.prismaService.reciept.findUnique({
      where: {
        id,
      },
    });

    if (!existingReceipt) {
      throw new NotFoundException(`Receipt with ID ${id} not found`);
    }

    await this.prismaService.reciept.delete({
      where: {
        id,
      },
    });
  }
}
