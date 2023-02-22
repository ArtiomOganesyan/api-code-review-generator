import { IsOptional, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  names: string;

  groupId: number | null;
}
