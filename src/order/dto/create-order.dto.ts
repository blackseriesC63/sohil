import { IsDateString, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: 'The ID of the table for the order' })
  @IsNumber()
  readonly tableId: number;

  @ApiProperty({ description: 'The ID of the customer placing the order' })
  @IsNumber()
  readonly customerId: number;

  @ApiProperty({ description: 'The ID of the employee processing the order' })
  @IsNumber()
  readonly employeeId: number;


  @ApiProperty({ description: 'The status of the order' })
  @IsString()
  readonly status: string;

  @ApiProperty({ description: 'The date and time of the order' })
  @IsDateString()
  readonly order_date: Date;


}
