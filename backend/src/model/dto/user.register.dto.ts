import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class UserRegisterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @Length(16, 500)
  password: string;
  createdAt: Date;
}
