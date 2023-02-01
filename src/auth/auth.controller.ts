import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  UseGuards,
  Request,
  Session,
  Req,
} from '@nestjs/common';
import { SERVICE } from 'src/utils/constants/constants';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/create-auth.dto';
import { AuthenticatedGuard } from '../utils/guards/Authenticated.guard';
import { LocalAuthGuard } from './guards/LocalAuth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(SERVICE.AUTH)
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  register(@Body() authData: CreateUserDto) {
    console.log(authData);
    console.log(this.configService.get('REGISTRATION_SECRET'));
    console.log(process.env.NODE_ENV !== 'production');
    return 'this.authService.createUser(authData)';
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

  // @Get(':id')
  // findOne(@Param('id') id: string) {}

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {}

  // @Delete(':id')
  // remove(@Param('id') id: string) {}
}
