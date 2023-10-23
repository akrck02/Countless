import { Module } from '@nestjs/common';
import { UserSchema } from './user';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/controller/users/user.controller';
import { UserService } from 'src/controller/users/user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
