import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Campus } from 'src/typeorm/entities/campus.entity';
import { Repository } from 'typeorm';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';

@Injectable()
export class CampusService {
  constructor(
    @InjectRepository(Campus) private readonly campusRepo: Repository<Campus>,
  ) {}

  async create(campusData: CreateCampusDto) {
    try {
      const campus = await this.campusRepo.create(campusData);
      return await this.campusRepo.save(campus);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return this.campusRepo.find();
  }

  async update(id: number, campusData: UpdateCampusDto) {
    try {
      const { affected } = await this.campusRepo.update({ id }, campusData);
      return { msg: `${affected} rows affected` };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const { affected } = await this.campusRepo.delete({ id });
      return { msg: `${affected} rows affected` };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
