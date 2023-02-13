import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampusService } from 'src/campus/campus.service';
import { Teacher } from 'src/typeorm/entities/teacher.entity';
import { Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly TeacherRepo: Repository<Teacher>,
    @Inject(CampusService)
    private readonly campusService: CampusService,
  ) {}

  async create({ name, campus: location }: CreateTeacherDto) {
    try {
      const { id } = await this.campusService.findByLocation(location);
      const teacher = await this.TeacherRepo.create({
        name,
        campus: { id },
      });
      return await this.TeacherRepo.save(teacher);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findByCampus(campus) {
    return await this.TeacherRepo.find({
      where: {
        campus: {
          location: campus,
        },
      },
    });
  }

  async update(id: number, teacherData: UpdateTeacherDto) {
    try {
      const { affected } = await this.TeacherRepo.update(
        { id },
        { name: teacherData.name },
      );
      return { msg: `${affected} rows affected` };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const { affected } = await this.TeacherRepo.delete({ id });
      return { msg: affected };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
