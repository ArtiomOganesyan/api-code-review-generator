import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CampusEnum } from 'src/constants/enums/campus.enum';

export class CreateCampusDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(CampusEnum)
  location: CampusEnum;
}
