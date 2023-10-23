import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ApiError } from 'src/error/apierror';
import { RegisterUserDTO } from 'src/model/dto/registeruserdto';
import { User } from 'src/model/schema/user/user';

@Injectable()
export class UserService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async register(createUserDTO: RegisterUserDTO): Promise<User> {
    const user = new User();
    user.name = createUserDTO.name;
    user.email = createUserDTO.email;
    user.password = createUserDTO.password;
    user.createdAt = new Date();

    // if password has less than minimum characters, throw error
    if (user.password.length < 16) {
      throw new ApiError('Password must have 16 characters', 400);
    }

    // if no especial character, throw error
    if (!user.password.match(/[^a-zA-Z0-9]/g)) {
      throw new ApiError(
        'Password must have at least one especial character',
        400,
      );
    }

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
}
