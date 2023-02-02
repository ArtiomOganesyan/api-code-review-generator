import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Campus } from './campus.entity';
import { Student } from './student.entity';
import { User } from './user.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    nullable: false,
  })
  phase: number;

  @ManyToOne(() => Campus, (campus) => campus.groups, { onDelete: 'CASCADE' })
  campus: Campus;

  @OneToMany(() => Student, (student) => student.group)
  students: Student[];
}
