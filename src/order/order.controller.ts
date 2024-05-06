import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Create an order' })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @ApiOperation({ summary: 'Get all orders' })
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Order ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an order by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Order ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Order ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
