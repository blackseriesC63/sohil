import { IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Import Swagger decorator

export class CreateTableDto {
  @ApiProperty({ description: 'The number of the table', example: 1 })
  @IsNumber()
  readonly table_number: number;

  @ApiProperty({ description: 'The capacity of the table', example: 4 })
  @IsNumber()
  readonly capacity: number;

  @ApiProperty({ description: 'Availability of the table', example: true })
  @IsBoolean()
  readonly isAvailable: boolean;
}
