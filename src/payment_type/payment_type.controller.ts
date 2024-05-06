import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentTypeService } from './payment_type.service';
import { CreatePaymentTypeDto } from './dto/create-payment_type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment_type.dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger'; // Import Swagger decorators

@ApiTags('Payment Type') // Specify the Swagger tag for this controller
@Controller('payment-type')
export class PaymentTypeController {
  constructor(private readonly paymentTypeService: PaymentTypeService) {}

  @ApiCreatedResponse({ description: 'Payment type created successfully' })
  @Post()
  create(@Body() createPaymentTypeDto: CreatePaymentTypeDto) {
    return this.paymentTypeService.create(createPaymentTypeDto);
  }

  @ApiOkResponse({ description: 'List of all payment types' })
  @Get()
  findAll() {
    return this.paymentTypeService.findAll();
  }

  @ApiOkResponse({ description: 'Payment type found' })
  @ApiNotFoundResponse({ description: 'Payment type not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentTypeService.findOne(+id);
  }

  @ApiOkResponse({ description: 'Payment type updated successfully' })
  @ApiNotFoundResponse({ description: 'Payment type not found' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentTypeDto: UpdatePaymentTypeDto,
  ) {
    return this.paymentTypeService.update(+id, updatePaymentTypeDto);
  }

  @ApiOkResponse({ description: 'Payment type deleted successfully' })
  @ApiNotFoundResponse({ description: 'Payment type not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentTypeService.remove(+id);
  }
}
