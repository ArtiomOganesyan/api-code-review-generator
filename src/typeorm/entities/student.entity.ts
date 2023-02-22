import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from './group.entity';
import { Review } from './review.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @ManyToOne(() => Group, (group) => group.students, { onDelete: 'SET NULL' })
  group: Group;

  @OneToMany(() => Review, (review) => review.user, { onDelete: 'SET NULL' })
  reviews: Review[];
}
