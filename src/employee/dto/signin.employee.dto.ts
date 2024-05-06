import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  isString,
} from 'class-validator';

export class SigninEmployeeDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly hashed_password: string;

}
