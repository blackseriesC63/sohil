import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ description: 'The name of the user', example: 'John Doe' })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john@example.com',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsNotEmpty()
  readonly password: string;
}
