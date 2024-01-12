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
    const users = await this.userRepository.find({
      select: ['id', 'name', 'score', 'solves', 'createdAt'],
      relations: ['solves'],
      where: {
        isAdmin: false,
      },
    });

    users.forEach((user) => {
      user.solves = user.solves.filter((solve) => solve.correct);
    });

    users.sort((a, b) => {
      if (a.score > b.score) {
        return -1;
      }
      if (a.score < b.score) {
        return 1;
      }
      if (a.score === 0) {
        return a.createdAt > b.createdAt ? 1 : -1;
      }
      return a.solves[0].createdAt > b.solves[0].createdAt ? 1 : -1;
    });

    return users;
  }
}
