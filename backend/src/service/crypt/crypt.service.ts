import { Injectable, Logger } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ApiError } from 'src/error/apierror';
import { AuthErrors } from 'src/error/auth';
import { StatusCode } from 'src/constant/http';

@Injectable()
export class CryptService {
  static readonly HASH_ALGORITHM = 'aes-256-ctr';
  static readonly HASH_ENCODING = 'hex';
  static readonly SALT_STRING = 'salt';
  static readonly SALT_ROUNDS = 32;
  static readonly BYTE_LENGTH = 16;

  constructor(private readonly jwtService: JwtService) {}

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

  async createJWT(
    user: string,
    userAgent: string,
    address: string,
  ): Promise<string> {
    const payload = { user, userAgent, address };
    return await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
  }

  async verifyJWT(
    token: string,
    user: string,
    userAgent: string,
    address: string,
  ): Promise<void> {
    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (e) {
      throw new ApiError(AuthErrors.INVALID_TOKEN, StatusCode.UNAUTHORIZED);
    }

    if (!payload || !payload.user || !payload.userAgent || !payload.address)
      throw new ApiError(AuthErrors.INVALID_TOKEN, StatusCode.UNAUTHORIZED);

    if (payload.exp < Date.now() / 1000)
      throw new ApiError(AuthErrors.TOKEN_EXPIRED, StatusCode.UNAUTHORIZED);

    if (
      payload.user !== user ||
      payload.userAgent !== userAgent ||
      payload.address !== address
    )
      throw new ApiError(AuthErrors.UNAUTHORIZED, StatusCode.UNAUTHORIZED);
  }
}
