import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { User } from '../user/user';

@Schema()
class Auth {
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
  UserAgent: string;
}
