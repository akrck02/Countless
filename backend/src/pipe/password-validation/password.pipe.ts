import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { StatusCode } from 'src/constant/http';
import { ApiError } from 'src/error/apierror';

@Injectable()
export class PasswordValidationType implements PipeTransform {
  static readonly PASSWORD_REGEX = /[^a-zA-Z0-9]/g;
  static readonly PASSWORD_MIN_LENGTH = 16;
  static readonly PASSWORD_LENGTH_ERROR = 'Password must have 16 characters';
  static readonly PASSWORD_SPECIAL_CHARACTER_ERROR =
    'Password must have at least one especial character';

  transform(user: any, _metadata: ArgumentMetadata) {
    // if password has less than minimum characters, throw error
    if (user.password.length < PasswordValidationType.PASSWORD_MIN_LENGTH) {
      throw new ApiError(
        PasswordValidationType.PASSWORD_LENGTH_ERROR,
        StatusCode.BAD_GATEWAY,
      );
    }

    // if no especial character, throw error
    if (!user.password.match(PasswordValidationType.PASSWORD_REGEX)) {
      throw new ApiError(
        PasswordValidationType.PASSWORD_SPECIAL_CHARACTER_ERROR,
        StatusCode.BAD_GATEWAY,
      );
    }

    return user;
  }
}
