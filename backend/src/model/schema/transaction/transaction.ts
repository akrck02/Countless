import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User } from '../user/user';

export type TransactionDocument = HydratedDocument<Transaction>;

const isPositiveNumber = (value: number) => {
  return value > 0;
};

const isValidType = (value: number) => {
  return (
    value === Transaction.TYPE_INCOME || value === Transaction.TYPE_OUTCOME
  );
};

@Schema()
export class Transaction {
  static readonly TYPE_INCOME = 0;
  static readonly TYPE_OUTCOME = 1;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: Types.ObjectId;

  @Prop({
    required: true,
    validators: [isValidType],
  })
  type: number;

  @Prop({
    required: true,
    validators: [isPositiveNumber],
  })
  amount: number;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: true,
  })
  date: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
