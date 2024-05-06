import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class signinEmployeeDto {
  @ApiProperty({
    description: 'The email address of the customer',
    example: 'john@example.com',
  })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({ description: 'The password of the customer' })
  @IsNotEmpty()
  @IsString()
  readonly hashed_password: string;
}
