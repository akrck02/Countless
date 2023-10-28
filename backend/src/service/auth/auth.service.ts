import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import { Auth } from 'src/model/schema/auth/auth';
import { CryptService } from '../crypt/crypt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(Auth.name) private authModel: Model<Auth>,
    private readonly cryptService: CryptService,
  ) {}

  async addToken(
    user: string,
    address: string,
    userAgent: string,
  ): Promise<string> {
    // if user already exists, update token
    const authModel = await this.authModel.findOne({
      user: new Types.ObjectId(user),
      address: address,
      userAgent: userAgent,
    });

    if (authModel) {
      authModel.token = await this.cryptService.createJWT(
        user,
        userAgent,
        address,
      );
      await authModel.save();
      return authModel.token;
    }

    // if user does not exist, create new token
    const auth = {
      user: new Types.ObjectId(user),
      token: await this.cryptService.createJWT(user, userAgent, address),
      address: address,
      userAgent: userAgent,
    };

    const createdAuth = new this.authModel(auth);
    await createdAuth.save();
    return createdAuth.token;
  }

  async checkToken(
    user: string,
    address: string,
    userAgent: string,
    token: string,
  ): Promise<void> {
    const authModel = await this.authModel.findOne({
      user: new Types.ObjectId(user),
      address: address,
      userAgent: userAgent,
    });

    if (!authModel || !authModel.token || authModel.token !== token)
      throw new UnauthorizedException();

    await this.cryptService.verifyJWT(token, user, userAgent, address);
  }
}
