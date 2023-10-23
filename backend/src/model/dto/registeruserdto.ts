import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
  createdAt: Date;
}
