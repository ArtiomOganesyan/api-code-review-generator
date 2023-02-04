import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  Inject,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { SERVICE } from 'src/utils/constants/constants';

@Controller('user')
export class UserController {
  constructor(
    @Inject(SERVICE.USER)
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto);
    if (result) {
      return { success: true };
    }
    throw new HttpException('Cannot create user', HttpStatus.BAD_REQUEST);
  }

  @Get()
  async findAll() {
    const result = await this.userService.findAll();
    if (result) {
      return result;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.userService.findById(id);
    if (result) {
      return result;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
