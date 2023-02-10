import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Inject,
  UseGuards,
  Request,
  Response,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SERVICE } from 'src/utils/constants/constants';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from '../utils/guards/Authenticated.guard';
import { LocalAuthGuard } from './guards/LocalAuth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { UnauthenticatedGuard } from 'src/utils/guards/Unauthenticated.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(SERVICE.AUTH)
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async register(@Body() authData: CreateUserDto) {
    try {
      if (authData.secret === this.configService.get('REGISTRATION_SECRET')) {
        return await this.authService.createUser(authData);
      }
    } catch (err) {
      throw new HttpException(
        'Contact site admin or try to login',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return req.user;
    // return this.authService.validateUser(authData.email, authData.password);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('logout')
  logout(@Request() req, @Response() res) {
    req.logout((err) => {
      console.log(err);
      if (err) {
        res.sendStatus(400);
        return;
      }
      res.clearCookie('elbrus_cookie');
      res.sendStatus(200);
    });
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  getAuthStatus(@Request() session: any) {
    return session.user;
  }

  @UseGuards(UnauthenticatedGuard)
  @Get('unauthenticated')
  getUnAuthStatus() {
    return true;
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {}

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {}

  // @Delete(':id')
  // remove(@Param('id') id: string) {}
}
