import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateStudentDto } from './create-student.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  groupId: string | number;
}
