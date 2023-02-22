import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { group } from 'console';
import { Student } from 'src/typeorm/entities/student.entity';
import { CampusEnum } from 'src/utils/constants/enums';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
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
      if (studentData.name) {
        const student = await this.StudentRepo.create({
          name: studentData.name,
          group: { id: +studentData.groupId },
        });
        return await this.StudentRepo.save(student);
      }

      const studentsData = studentData.names.split('\n').map((student) => ({
        name: student,
        group: { id: +studentData.groupId },
      }));

      const students = await this.StudentRepo.create(studentsData);
      return await this.StudentRepo.save(students);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findById(id: number) {
    return this.StudentRepo.findOneBy({ id });
  }

  async findBy(name?: string, groupId?: number, campus?: CampusEnum) {
    const optionsWhere: FindOptionsWhere<Student> = {};
    const relations = { group: { campus: false } };

    // TODO take this logic out to a better place, maybe use a Builder instead
    if (name) {
      optionsWhere.name = ILike(`%${name}%`);
    }

    if (groupId) {
      optionsWhere.group = { id: groupId };
    }

    if (campus) {
      relations.group = { campus: true };

      if (typeof optionsWhere.group === 'object') {
        optionsWhere.group = {
          ...optionsWhere.group,
          campus: { location: campus },
        };
      } else {
        optionsWhere.group = {
          campus: { location: campus },
        };
      }
    }

    console.log({ optionsWhere });

    const result = await this.StudentRepo.find({
      relations,
      where: optionsWhere,
      order: { group: { phase: 'ASC' } },
    });
    return result;
  }

  async update(id: number, studentData: UpdateStudentDto) {
    try {
      const updateOptions: Record<string, string | number> = {};
      if (studentData.name) {
        updateOptions.name = studentData.name;
      }
      if (studentData.groupId || studentData.groupId === null) {
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
