import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { SERVICE } from 'src/utils/constants/constants';
import { UserService } from 'src/user/user.service';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(SERVICE.USER) private readonly userService: UserService,
  ) {}

  async validateUser(email, password) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isValidPassword = await comparePassword(password, user.password);

    if (isValidPassword) {
      const { password, ...userData } = user;
      return userData;
    }
    throw new UnauthorizedException();
  }

  async createUser(authData) {
    const result = await this.userService.create(authData);
    console.log(result);
    return result;
  }
}
