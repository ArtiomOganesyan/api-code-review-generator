import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Campus } from './campus.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  name: string;

  @ManyToOne(() => Campus, (campus) => campus.teachers)
  campus: Campus;
}
