import { IsEnum } from 'class-validator';
import { CampusEnum } from 'src/utils/constants/enums';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './group.entity';

@Entity()
export class Campus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  @IsEnum(CampusEnum)
  location: CampusEnum;

  @OneToMany(() => Group, (group: Group) => group.campus)
  groups: Group[];
}
