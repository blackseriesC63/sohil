import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({ description: 'The name of the employee' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The role ID of the employee' })
  @IsNotEmpty()
  readonly roleId: number;

  @ApiProperty({ description: 'The email address of the employee' })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({ description: 'The phone number of the employee in UZ format' })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('UZ')
  readonly phone: string;

  @ApiProperty({ description: 'The password of the employee' })
  @IsStrongPassword()
  @IsString()
  readonly password: string;
}
