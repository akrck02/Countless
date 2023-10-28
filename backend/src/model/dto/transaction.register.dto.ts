import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TransactionRegisterDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  type: number;

  @IsNotEmpty()
  @IsString()
  description: string;
  createdAt: Date;
}
