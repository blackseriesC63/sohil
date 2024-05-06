import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: 'Create a payment' })
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @ApiOperation({ summary: 'Get all payments' })
  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @ApiOperation({ summary: 'Get a payment by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Payment ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a payment by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Payment ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @ApiOperation({ summary: 'Delete a payment by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Payment ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
