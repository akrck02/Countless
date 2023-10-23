import { Body, Controller, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDTO as RegisterUserDTO } from 'src/model/registeruserdto';
import { User } from 'src/schemas/user/user';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('register')
  async register(@Body() user: RegisterUserDTO): Promise<User> {
    const result = await this.userService.register(user);
    return result;
  }
}