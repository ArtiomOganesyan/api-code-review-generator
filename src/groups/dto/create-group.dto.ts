import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  phase: number;

  @IsNotEmpty()
  campusId: number;
}
