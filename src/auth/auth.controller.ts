import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  UseGuards,
  Request,
  Req,
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
  register(@Body() authData: CreateUserDto) {
    if (authData.secret === this.configService.get('REGISTRATION_SECRET')) {
      return this.authService.createUser(authData);
    }
    throw new HttpException('Contact site admin', HttpStatus.FORBIDDEN);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return req.user;
    // return this.authService.validateUser(authData.email, authData.password);
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  getAuthStatus(@Req() session: any) {
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
