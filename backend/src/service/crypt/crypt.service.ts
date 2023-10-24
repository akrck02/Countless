import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptService {
  static readonly HASH_ALGORITHM = 'aes-256-ctr';
  static readonly HASH_ENCODING = 'hex';
  static readonly SALT_STRING = 'salt';
  static readonly SALT_ROUNDS = 32;
  static readonly BYTE_LENGTH = 16;

  async encodeAes256Crt(text: string): Promise<string> {
    const secret = process.env.CRYPT_SECRET;
    const iv = randomBytes(CryptService.BYTE_LENGTH);

    // The key length is dependent on the algorithm.
    // In this case for aes256, it is 32 bytes.
    const key = (await promisify(scrypt)(
      secret,
      CryptService.SALT_STRING,
      CryptService.SALT_ROUNDS,
    )) as Buffer;
    const cipher = createCipheriv(CryptService.HASH_ALGORITHM, key, iv);

    const encryptedText = Buffer.concat([cipher.update(text), cipher.final()]);
    return encryptedText.toString(CryptService.HASH_ENCODING);
  }

  async decodeAes256Crt(text: string): Promise<string> {
    const secret = process.env.CRYPT_SECRET;
    const iv = randomBytes(CryptService.BYTE_LENGTH);

    // The key length is dependent on the algorithm.
    // In this case for aes256, it is 32 bytes.
    const key = (await promisify(scrypt)(
      secret,
      CryptService.SALT_STRING,
      CryptService.SALT_ROUNDS,
    )) as Buffer;
    const decipher = createDecipheriv(CryptService.HASH_ALGORITHM, key, iv);

    return Buffer.concat([
      decipher.update(Buffer.from(text, CryptService.HASH_ENCODING)),
      decipher.final(),
    ]).toString();
  }

  async hashBcrypt(text: string): Promise<string> {
    const saltOrRounds = await bcrypt.genSalt();

    const hash = await bcrypt.hash(text, saltOrRounds);
    return hash;
  }

  async compareBcrypt(text: string, text2: string): Promise<boolean> {
    return await bcrypt.compare(text, text2);
  }
}
