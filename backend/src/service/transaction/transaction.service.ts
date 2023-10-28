import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Connection, Model } from 'mongoose';
import { TransactionListDto } from 'src/model/dto/transaction.list.dto';
import { TransactionRegisterDto } from 'src/model/dto/transaction.register.dto';
import { Transaction } from 'src/model/schema/transaction/transaction';

@Injectable()
export class TransactionService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
  ) {}

  async register(
    transactionRegisterDto: TransactionRegisterDto,
  ): Promise<Transaction> {
    const transaction = new Transaction();

    transaction.amount = transactionRegisterDto.amount;
    transaction.description = transactionRegisterDto.description;
    transaction.type = transactionRegisterDto.type;
    transaction.user = new mongoose.Types.ObjectId(
      transactionRegisterDto.userId,
    );
    transaction.date = new Date();

    const createdTransaction = new this.transactionModel(transaction);
    await createdTransaction.save();
    return createdTransaction;
  }

  async list(transactionListDto: TransactionListDto): Promise<Transaction[]> {
    const transactions = await this.transactionModel
      .find({
        user: new mongoose.Types.ObjectId(transactionListDto.user),
        type: transactionListDto.type,
      })
      .sort({ date: -1 })
      .skip(0)
      .exec();

    return transactions;
  }
}
