import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { SERVICE } from 'src/utils/constants/constants';
import { SessionSerializer } from './SessionSerializer';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    { provide: SERVICE.AUTH, useClass: AuthService },
    LocalStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
