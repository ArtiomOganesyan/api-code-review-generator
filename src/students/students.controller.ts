import {
  UseGuards,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AuthenticatedGuard } from 'src/utils/guards/Authenticated.guard';
import { CampusEnum } from 'src/utils/constants/enums';

@Controller('students')
@UseGuards(AuthenticatedGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() studentData: CreateStudentDto) {
    return this.studentsService.create(studentData);
  }

  @Get('')
  async findBy(
    @Query('name') name: string,
    @Query('groupId') groupId: number,
    @Query('campus') campus: CampusEnum,
  ) {
    return await this.studentsService.findBy(name, groupId, campus);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.studentsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
