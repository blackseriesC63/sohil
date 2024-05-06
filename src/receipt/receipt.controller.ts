import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger'; // Import Swagger decorators

@ApiTags('Receipt') // Specify the Swagger tag for this controller
@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @ApiCreatedResponse({ description: 'Receipt created successfully' })
  @Post()
  create(@Body() createReceiptDto: CreateReceiptDto) {
    return this.receiptService.create(createReceiptDto);
  }

  @ApiOkResponse({ description: 'List of all receipts' })
  @Get()
  findAll() {
    return this.receiptService.findAll();
  }



  @ApiOkResponse({ description: 'Receipt found' })
  @ApiNotFoundResponse({ description: 'Receipt not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receiptService.findOne(+id);
  }

  @ApiOkResponse({ description: 'Receipt updated successfully' })
  @ApiNotFoundResponse({ description: 'Receipt not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReceiptDto: UpdateReceiptDto) {
    return this.receiptService.update(+id, updateReceiptDto);
  }

  @ApiOkResponse({ description: 'Receipt deleted successfully' })
  @ApiNotFoundResponse({ description: 'Receipt not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receiptService.remove(+id);
  }
}
