import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/typeorm/entities/teacher.entity';
import { CampusModule } from 'src/campus/campus.module';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher]), CampusModule],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
