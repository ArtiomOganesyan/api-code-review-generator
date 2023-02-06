import { IsEnum } from 'class-validator';
import { type } from 'os';
import { CampusEnum } from 'src/utils/constants/enums';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './group.entity';
import { Teacher } from './teacher.entity';

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

  @OneToMany(() => Teacher, (teacher) => teacher.campus)
  teachers: Teacher[];
}
