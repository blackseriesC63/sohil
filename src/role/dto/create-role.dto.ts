import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Import Swagger decorator

export class CreateRoleDto {
  @ApiProperty({ description: 'The name of the role', example: 'Admin' })
  @IsNotEmpty()
  @IsString()
  readonly role_name: string;
}
