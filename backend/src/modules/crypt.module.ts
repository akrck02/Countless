import { Module } from '@nestjs/common';
import { CryptService } from 'src/service/crypt/crypt.service';
import { AuthModule } from './auth.module';

@Module({
  providers: [CryptService],
  exports: [CryptService],
  imports: [],
})
export class CryptModule {}
