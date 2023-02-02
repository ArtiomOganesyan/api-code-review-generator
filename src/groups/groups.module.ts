import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/typeorm/entities/group.entity';
import { Campus } from 'src/typeorm/entities/campus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, Campus])],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
