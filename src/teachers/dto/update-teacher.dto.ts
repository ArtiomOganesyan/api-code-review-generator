import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateTeacherDto } from './create-teacher.dto';

export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {}
