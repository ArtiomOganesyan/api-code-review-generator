import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Campus } from './campus.entity';

export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @ManyToOne(() => Campus, (campus) => campus.teachers)
  campus: Campus;
}
