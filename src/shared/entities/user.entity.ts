import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Solve } from './solve.entity';
import { Docker } from './docker.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  school: string;

  @Column({ default: 0 })
  score: number;

  @OneToMany(() => Solve, (solve) => solve.user)
  solves: Solve[];

  @Column('bool', { default: false })
  isAdmin: boolean;

  @OneToMany(() => Docker, (docker) => docker.user, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  dockers: Docker[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
