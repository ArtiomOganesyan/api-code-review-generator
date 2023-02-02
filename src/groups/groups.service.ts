import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Campus } from 'src/typeorm/entities/campus.entity';
import { Group } from 'src/typeorm/entities/group.entity';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private readonly GroupRepo: Repository<Group>,
    @InjectRepository(Campus) private readonly CampusRepo: Repository<Campus>,
  ) {}

  async create(groupData: CreateGroupDto, user) {
    try {
      const group = await this.GroupRepo.create(groupData);
      const campus = await this.CampusRepo.findOneBy({
        id: +groupData.campusId,
      });

      if (!campus) {
        throw new Error(`Campus not found`);
      }

      group.campus = campus;
      return await this.GroupRepo.save(group);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findAll(query) {
    return this.GroupRepo.find({
      relations: {
        campus: true,
        students: query.students,
      },
    });
  }

  findOne(id: number, query) {
    return this.GroupRepo.findOne({
      where: { id },
      relations: {
        campus: true,
        students: query.students,
      },
    });
  }

  async update(id: number, groupData: UpdateGroupDto) {
    try {
      const { affected } = await this.GroupRepo.update({ id }, groupData);
      return { msg: `${affected} rows affected` };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const { affected } = await this.GroupRepo.delete({ id });
      return { msg: `${affected} rows affected` };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
