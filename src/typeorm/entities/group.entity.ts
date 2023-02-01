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
  name: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    // #KNOW this column will be hidden by default. Use query builder to retrieve it.
    select: false,
    nullable: false,
  })
  password: string;

  @ManyToOne(() => Campus, (campus) => campus.groups)
  campus: Campus;

  @OneToMany(() => User, (user) => user.group)
  users: User[];

  @OneToMany(() => Student, (student) => student.group)
  students: Student[];

  @OneToMany(() => User, (user) => user.group)
  teachers: User[];
}
