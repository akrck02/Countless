import { Module } from '@nestjs/common';
import { UserSchema } from '../model/schema/user/user';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/controller/user/user.controller';
import { UserService } from 'src/service/user/user.service';
import { CryptModule } from './crypt.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    CryptModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
