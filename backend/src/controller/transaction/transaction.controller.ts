import { Body, Controller, Get, Put } from '@nestjs/common';
import { TransactionListDto } from 'src/model/dto/transaction.list.dto';
import { TransactionRegisterDto } from 'src/model/dto/transaction.register.dto';
import { Transaction } from 'src/model/schema/transaction/transaction';
import { TransactionService } from 'src/service/transaction/transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Put('register')
  async register(
    @Body() transaction: TransactionRegisterDto,
  ): Promise<Transaction> {
    const result = await this.transactionService.register(transaction);
    return result;
  }

  @Get('list/income')
  async listIncome(
    @Body() transactionListDto: TransactionListDto,
  ): Promise<Transaction[]> {
    transactionListDto.type = Transaction.TYPE_INCOME;
    const result = await this.transactionService.list(transactionListDto);
    return result;
  }

  @Get('list/outcome')
  async listOutcome(
    @Body() transactionListDto: TransactionListDto,
  ): Promise<Transaction[]> {
    transactionListDto.type = Transaction.TYPE_OUTCOME;
    const result = await this.transactionService.list(transactionListDto);
    return result;
  }
}
