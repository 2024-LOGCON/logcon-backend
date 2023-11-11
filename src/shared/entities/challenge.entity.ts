import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Solve } from './solve.entity';
import { Category } from './category.entity';

@Entity()
export class Challenge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  connection: string;

  @Column()
  flag: string;

  @Column({ default: 500 })
  point: number;

  @Column()
  file: string;

  @Column({ default: false })
  visible: boolean;

  @OneToMany(() => Solve, (solve) => solve.challenge, {
    eager: true,
  })
  solves: Solve[];

  @ManyToOne(() => Category, (category) => category.challenges, {
    eager: true,
  })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
