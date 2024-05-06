import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderItemsService } from './order_items.service';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('order-items')
@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @ApiOperation({ summary: 'Create an order item' })
  @Post()
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsService.create(createOrderItemDto);
  }

  @ApiOperation({ summary: 'Get all order items' })
  @Get()
  findAll() {
    return this.orderItemsService.findAll();
  }

  @ApiOperation({ summary: 'Get an order item by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Order item ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderItemsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an order item by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Order item ID' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemsService.update(+id, updateOrderItemDto);
  }

  @ApiOperation({ summary: 'Delete an order item by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Order item ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItemsService.remove(+id);
  }
}
