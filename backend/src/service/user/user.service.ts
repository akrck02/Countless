import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ApiError } from 'src/error/apierror';
import { UserRegisterDto } from 'src/model/dto/user.register.dto';
import { User } from 'src/model/schema/user/user';
import { CryptService } from '../crypt/crypt.service';
import { UserLoginDto } from 'src/model/dto/user.login.dto';
import { log } from 'console';

@Injectable()
export class UserService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly cryptService: CryptService,
  ) {}

  async register(createUserDTO: UserRegisterDto): Promise<User> {
    const user = new User();
    user.name = createUserDTO.name;
    user.email = createUserDTO.email;
    user.password = await this.cryptService.hashBcrypt(createUserDTO.password);
    user.createdAt = new Date();

    // if user already exists, throw error
    if (
      await this.userModel.findOne({
        email: user.email,
      })
    ) {
      throw new ApiError('User already exists', 409);
    }

    const createdUser = new this.userModel(user);
    await createdUser.save();
    return createdUser;
  }

  async login(
    userLoginDto: UserLoginDto,
    ip: string,
    userAgent: string,
  ): Promise<User> {
    console.log(userLoginDto);
    console.log(ip);
    console.log(userAgent);
    console.log(await this.cryptService.hashBcrypt(userLoginDto.password));

    const user = await this.userModel.findOne({
      email: userLoginDto.email,
    });

    if (!user) {
      throw new ApiError('User not found', 404);
    }

    if (this.cryptService.compareBcrypt(userLoginDto.password, user.password)) {
      throw new ApiError('Password does not match', 401);
    }

    console.log(user);

    return user;
  }
}
