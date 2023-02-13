import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { SERVICE } from 'src/utils/constants/constants';
import { UserService } from 'src/user/user.service';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(SERVICE.USER)
    private readonly userService: UserService,
  ) {
    super();
  }

  async deserializeUser(payload: any, done: (err, result) => void) {
    const user = await this.userService.findById(payload.id);
    console.log('====>', user);

    done(null, user);
  }

  serializeUser(user: any, done: (err, result) => void) {
    console.log(user);

    done(null, user);
  }
}
