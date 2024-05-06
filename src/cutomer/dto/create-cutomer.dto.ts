import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCutomerDto {
  @ApiProperty({ description: 'The name of the customer', example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'The email address of the customer',
    example: 'john@example.com',
  })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({
    description: 'The phone number of the customer',
    example: '123-456-7890',
  })
  @IsNotEmpty()
  @IsPhoneNumber('UZ', { message: 'Invalid phone number' })
  readonly phone: string;

  @ApiProperty({ description: 'The password of the customer' })
  @IsNotEmpty()
  @IsString()
  readonly hashed_password: string;

  // @ApiProperty({ description: 'The confirm password of the customer' })
  // @IsString()
  // readonly confirm_password: string;

  // @ApiProperty({ description: 'The activation link of the customer' })
  // @IsString()
  // readonly activation_link: string;
}
