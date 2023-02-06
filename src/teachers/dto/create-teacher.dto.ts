import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  campusId: number;
}
