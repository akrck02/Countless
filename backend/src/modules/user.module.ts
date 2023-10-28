import { Module } from '@nestjs/common';
import { UserSchema } from '../model/schema/user/user';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/controller/user/user.controller';
import { UserService } from 'src/service/user/user.service';
import { CryptModule } from './crypt.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    CryptModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' }, // process.env.JWT_EXPIRES_IN
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
