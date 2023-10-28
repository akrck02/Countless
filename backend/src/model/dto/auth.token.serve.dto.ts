import { IsString } from 'class-validator';

export class AuthTokenServeDto {
  @IsString()
  token: string;
}
