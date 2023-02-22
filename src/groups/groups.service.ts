import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampusService } from 'src/campus/campus.service';
import { Campus } from 'src/typeorm/entities/campus.entity';
import { Group } from 'src/typeorm/entities/group.entity';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private readonly GroupRepo: Repository<Group>,
    @Inject(CampusService) private readonly campusService: CampusService,
  ) {}

  async create(groupData: CreateGroupDto, user) {
    try {
      const { title, location, phase } = groupData;
      const { id } = await this.campusService.findByLocation(location);
      const group = await this.GroupRepo.create({
        title,
        phase: +phase,
        campus: { id },
      });

      if (!id) {
        throw new Error(`Campus not found`);
      }

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
      where: { campus: { location: query.campus } },
    });
  }

  async findOne(id: number, query) {
    return await this.GroupRepo.findOne({
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
      return { msg: 'affected' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const { affected } = await this.GroupRepo.delete({ id });
      return { msg: affected };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
