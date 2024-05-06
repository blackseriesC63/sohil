import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuItemDto {
  @ApiProperty({ description: 'The name of the menu item' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The price of the menu item' })
  @IsNumber()
  readonly price: number;

  @ApiProperty({ description: 'The description of the menu item' })
  @IsString()
  readonly description: string;

  @ApiProperty({ description: 'The image URL of the menu item' })
  @IsString()
  readonly image: string;

  @ApiProperty({
    description: 'The ID of the food category associated with the menu item',
  })
  @IsNumber()
  readonly food_categoryId: number;
}
