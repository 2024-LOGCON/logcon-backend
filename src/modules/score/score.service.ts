import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { Brackets, Repository } from 'typeorm';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findAll() {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.solves', 'solve')
      .where('user.isAdmin = :isAdmin', { isAdmin: false })
      .andWhere(
        new Brackets((qb) => {
          qb.where('solve.correct = :correct', { correct: true })
            .orWhere('solve.correct IS NULL')
            .orWhere(
              'NOT EXISTS (SELECT 1 FROM solve subSolve WHERE subSolve.userId = user.id AND subSolve.correct = :trueCorrect)',
              { trueCorrect: true },
            );
        }),
      )
      .andWhere('solve.correct IS NULL OR solve.correct = :correct', {
        correct: true,
      })
      .orderBy('user.score', 'DESC')
      .addOrderBy('solve.createdAt', 'ASC')
      .select(['user.id', 'user.name', 'user.score', 'solve'])
      .getMany();

    return users;
  }
}
