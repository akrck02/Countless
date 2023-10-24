import { Body, Controller, Post, Put, Req, UsePipes } from '@nestjs/common';
import { UserService } from '../../service/user/user.service';
import { UserRegisterDto } from 'src/model/dto/user.register.dto';
import { User } from 'src/model/schema/user/user';
import { PasswordValidationType } from 'src/pipe/password-validation/password.pipe';
import { Request } from 'express';
import { UserLoginDto } from 'src/model/dto/user.login.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('register')
  @UsePipes(new PasswordValidationType())
  async register(@Body() user: UserRegisterDto): Promise<User> {
    const result = await this.userService.register(user);
    return result;
  }

  @Post('login')
  async login(
    @Req() request: Request,
    @Body() user: UserLoginDto,
  ): Promise<User> {
    const ip = request.ip;
    const userAgent = request.headers['user-agent'];

    const result = await this.userService.login(user, ip, userAgent);
    return result;
  }
}
