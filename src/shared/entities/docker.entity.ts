import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Challenge } from './challenge.entity';
import { User } from './user.entity';

@Entity()
export class Docker {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Challenge, (challenge) => challenge.dockers, {
    eager: true,
  })
  challenge: Challenge;

  @Column({ unique: true })
  containerId: string;

  @ManyToOne(() => User, (user) => user.dockers)
  user: User;

  @Column()
  port: number;

  @CreateDateColumn()
  createdAt: Date;
}
