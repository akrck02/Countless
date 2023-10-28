import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from 'src/model/schema/auth/auth';
import { AuthService } from 'src/service/auth/auth.service';
import { CryptModule } from './crypt.module';

@Module({
  providers: [AuthService],
  exports: [AuthService],
  imports: [
    MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }]),
    CryptModule,
  ],
})
export class AuthModule {}
