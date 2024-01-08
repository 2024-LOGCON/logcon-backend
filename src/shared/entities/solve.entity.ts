import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Challenge } from './challenge.entity';

@Entity()
export class Solve {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.solves)
  user: User;

  @ManyToOne(() => Challenge, (challenge) => challenge.solves, {
    eager: true,
  })
  challenge: Challenge;

  @Column()
  flag: string;

  @Column({ default: false })
  correct: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
