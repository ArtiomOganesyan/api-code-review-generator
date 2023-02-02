import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CampusEnum } from 'src/utils/constants/enums';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(CampusEnum)
  @IsNotEmpty()
  campus: CampusEnum;

  @IsString()
  @IsNotEmpty()
  secret: string;
}
