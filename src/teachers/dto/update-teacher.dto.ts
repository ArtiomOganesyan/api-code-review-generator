import { PartialType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';
import { CreateTeacherDto } from './create-teacher.dto';

export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {}
