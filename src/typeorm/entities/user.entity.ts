import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from './review.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({ default: false })
  mentor: boolean;

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

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
