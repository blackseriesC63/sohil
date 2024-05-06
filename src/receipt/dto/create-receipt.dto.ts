import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Import Swagger decorator

export class CreateReceiptDto {
  @ApiProperty({
    description: 'The ID of the payment associated with the receipt',
  })
  @IsNumber()
  readonly payment_typeId: number;

  @ApiProperty({
    description: 'The ID of the order associated with the receipt',
  })
  @IsNumber()
  readonly orderId: number;

  @ApiProperty({
    description: 'The total price of the order associated with the receipt',
  })
  readonly total_price: number;
}
