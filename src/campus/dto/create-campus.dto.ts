import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CampusEnum } from 'src/utils/constants/enums';

export class CreateCampusDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(CampusEnum)
  location: CampusEnum;
}
