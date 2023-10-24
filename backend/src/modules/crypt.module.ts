import { Module } from '@nestjs/common';
import { CryptService } from 'src/service/crypt/crypt.service';

@Module({
  providers: [CryptService],
  exports: [CryptService],
})
export class CryptModule {}
