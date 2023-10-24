import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from '../model/schema/transaction/transaction';
import { TransactionController } from 'src/controller/transaction/transaction.controller';
import { TransactionService } from 'src/service/transaction/transaction.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Transaction', schema: TransactionSchema },
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
