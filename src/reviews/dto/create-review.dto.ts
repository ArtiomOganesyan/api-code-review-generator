import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsInt()
  grade: number;

  @IsInt()
  studentId: number;
}
