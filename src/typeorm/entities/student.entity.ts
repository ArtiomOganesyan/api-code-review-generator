import { IsEnum } from 'class-validator';
import { Campus } from 'src/utils/constants/enums';
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

  @ManyToOne(() => Group, (group) => group.students)
  group: Group;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
