import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  phase: number;

  @IsString()
  @IsNotEmpty()
  location: string;
}
