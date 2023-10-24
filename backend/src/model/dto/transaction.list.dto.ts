import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class TransactionListDto {
  @IsString()
  @IsNotEmpty()
  user: string;

  @IsOptional()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsNumber()
  type: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsDate()
  date: Date;
}
