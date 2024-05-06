import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Import Swagger decorator

export class CreatePaymentTypeDto {
  @ApiProperty({ description: 'The type of payment', example: 'Credit Card' })
  @IsNotEmpty()
  @IsString()
  readonly payment_type: string;
}
