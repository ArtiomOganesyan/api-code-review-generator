import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Campus } from 'src/utils/constants/enums';

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

  @IsEnum(Campus)
  @IsNotEmpty()
  campus: Campus;

  @IsString()
  @IsNotEmpty()
  secret: string;
}
