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
import { Docker } from './docker.entity';

export enum ChallengeType {
  NONE = 'NONE',
  REMOTE = 'REMOTE',
  DOCKER = 'DOCKER',
}

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

  @Column({ nullable: true })
  file: string;

  @Column({ default: false })
  visible: boolean;

  @OneToMany(() => Solve, (solve) => solve.challenge)
  solves: Solve[];

  @ManyToOne(() => Category, (category) => category.challenges, {
    eager: true,
  })
  category: Category;

  @Column('enum', { enum: ChallengeType, default: ChallengeType.NONE })
  type: ChallengeType;

  @OneToMany(() => Docker, (docker) => docker.challenge, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  dockers?: Docker[];

  @Column({ nullable: true })
  imageId?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
