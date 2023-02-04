import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/typeorm/entities/student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly StudentRepo: Repository<Student>,
  ) {}

  async create(studentData: CreateStudentDto) {
    try {
      const student = await this.StudentRepo.create({
        name: studentData.name,
        group: { id: +studentData.groupId },
      });
      return await this.StudentRepo.save(student);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findAll(students) {
    return this.StudentRepo.find();
  }

  findOne(id: number) {
    return this.StudentRepo.findOneBy({ id });
  }

  async update(id: number, studentData: UpdateStudentDto) {
    try {
      const updateOptions: Record<string, string | number> = {};
      if (studentData.name) {
        updateOptions.name = studentData.name;
      }
      if (studentData.groupId) {
        updateOptions.group = studentData.groupId;
      }
      const { affected } = await this.StudentRepo.update({ id }, updateOptions);
      return { msg: `${affected} rows affected` };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const { affected } = await this.StudentRepo.delete({ id });
      return { msg: `${affected} rows affected` };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
