import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ApiError } from 'src/error/apierror';
import { UserRegisterDto } from 'src/model/dto/user.register.dto';
import { User } from 'src/model/schema/user/user';
import { CryptService } from '../crypt/crypt.service';
import { UserLoginDto } from 'src/model/dto/user.login.dto';
import { StatusCode } from 'src/constant/http';
import { AuthService } from '../auth/auth.service';
import { UserErrors } from 'src/error/user';

@Injectable()
export class UserService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly cryptService: CryptService,
    private readonly authService: AuthService,
  ) {}

  async register(createUserDTO: UserRegisterDto): Promise<User> {
    const user = {
      name: createUserDTO.name,
      email: createUserDTO.email,
      password: createUserDTO.password,
      createdAt: new Date(),
    };

    // if user already exists, throw error
    if (
      await this.userModel.findOne({
        email: user.email,
      })
    ) {
      throw new ApiError(UserErrors.USER_ALREADY_EXISTS, StatusCode.CONFLICT);
    }

    const createdUser = new this.userModel(user);
    await createdUser.save();
    return createdUser;
  }

  async login(
    userLoginDto: UserLoginDto,
    ip: string,
    userAgent: string,
  ): Promise<string> {
    const user = await this.userModel.findOne({
      email: userLoginDto.email,
    });

    if (!user) {
      throw new ApiError(UserErrors.USER_NOT_FOUND, StatusCode.NOT_FOUND);
    }

    if (
      !this.cryptService.compareBcrypt(userLoginDto.password, user.password)
    ) {
      throw new ApiError(
        UserErrors.PASSWORD_DOES_NOT_MATCH,
        StatusCode.UNAUTHORIZED,
      );
    }

    const token = await this.authService.addToken(
      user._id.toString(),
      ip,
      userAgent,
    );
    return token;
  }
}
