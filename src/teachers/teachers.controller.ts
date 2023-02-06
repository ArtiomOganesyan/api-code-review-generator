import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
  Query,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { AuthenticatedGuard } from 'src/utils/guards/Authenticated.guard';
import { ParseIntPipe } from '@nestjs/common/pipes';

@UseGuards(AuthenticatedGuard)
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  create(@Body() teacherData: CreateTeacherDto) {
    return this.teachersService.create(teacherData);
  }

  @Get()
  findByCampus(@Query('campus') campus: string) {
    return this.teachersService.findByCampus(campus);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() teacherData: UpdateTeacherDto) {
    return this.teachersService.update(+id, teacherData);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.teachersService.remove(id);
  }
}
