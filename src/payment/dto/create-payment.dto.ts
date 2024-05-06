import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ description: 'The ID of the reciept type', type: Number })
  @IsNotEmpty()
  @IsNumber()
  readonly recieptId: number


  @ApiProperty({ description: 'The ID of the payment type', type: Number })
  @IsNotEmpty()
  @IsNumber()
  readonly payment_typeId: number;
}
