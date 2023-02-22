import { PassportStrategy } from '@nestjs/passport/dist';
import { Strategy } from 'passport-local';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { SERVICE } from 'src/utils/constants/constants';
import { AuthService } from '../auth.service';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(SERVICE.AUTH)
    private readonly authService: AuthService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
