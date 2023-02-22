import { IsEnum } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { User } from './user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  text: string;

  @Column({
    nullable: false,
  })
  grade: number;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'SET NULL' })
  user: User;

  @ManyToOne(() => Student, (student) => student.reviews, {
    onDelete: 'SET NULL',
  })
  student: Student;
}
