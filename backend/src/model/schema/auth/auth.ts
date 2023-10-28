import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User } from '../user/user';

export type UserDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: Types.ObjectId;

  @Prop({
    required: true,
  })
  token: string;

  @Prop({
    required: true,
  })
  address: string;

  @Prop({
    required: true,
  })
  userAgent: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
