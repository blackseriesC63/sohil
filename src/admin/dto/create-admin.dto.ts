import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ description: 'The name of the admin', example: 'admin' })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'The email address of the admin',
    example: 'admin@example.com',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'The phone number of the admin',
    example: '123-456-7890',
  })
  @IsPhoneNumber('UZ')
  readonly phone: string;

  @ApiProperty({ description: 'The password of the admin' })
  @IsStrongPassword()
  readonly password: string;

  @ApiProperty({
    description: 'Whether the admin is active or not',
    example: true,
  })
  @IsBoolean()
  readonly is_active: boolean;

  @ApiProperty({
    description: 'Whether the admin is a creator or not',
    example: false,
  })
  @IsBoolean()
  readonly is_creator: boolean;
}
