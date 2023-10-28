import { Body, Controller, Post, Put, Req, UsePipes } from '@nestjs/common';
import { UserService } from '../../service/user/user.service';
import { UserRegisterDto } from 'src/model/dto/user.register.dto';
import { User } from 'src/model/schema/user/user';
import { PasswordValidationType } from 'src/pipe/password-validation/password.pipe';
import { Request } from 'express';
import { UserLoginDto } from 'src/model/dto/user.login.dto';
import { AuthTokenServeDto } from 'src/model/dto/auth.token.serve.dto';
import { Public } from 'src/decorators/auth';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Put('register')
  @UsePipes(new PasswordValidationType())
  async register(@Body() user: UserRegisterDto): Promise<User> {
    const result = await this.userService.register(user);
    return result;
  }

  @Public()
  @Post('login')
  async login(
    @Req() request: Request,
    @Body() user: UserLoginDto,
  ): Promise<AuthTokenServeDto> {
    const ip = request.ip;
    const userAgent = request.headers['user-agent'];

    const result = await this.userService.login(user, ip, userAgent);
    return {
      token: result,
    };
  }
}
