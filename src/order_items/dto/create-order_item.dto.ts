import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({ description: 'The ID of the menu item' })
  @IsNumber()
  readonly menu_itemsId: number;

  @ApiProperty({ description: 'The quantity of the menu item in the order' })
  @IsNumber()
  readonly quantity: number;

  @ApiProperty({ description: 'The ID of the order' })
  @IsNumber()
  readonly orderId: number;

  @ApiProperty({ description: 'The ID of the order' })
  @IsString()
  readonly comments: string;
}
