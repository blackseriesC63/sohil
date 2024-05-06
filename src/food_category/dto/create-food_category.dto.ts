import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFoodCategoryDto {
  @ApiProperty({ description: 'The name of the food category' })
  @IsString()
  readonly name: string;
}
