import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findAll() {
    const users = await this.userRepository.find({
      select: ['id', 'name', 'score', 'solves'],
      order: {
        score: 'DESC',
        solves: {
          createdAt: 'ASC',
        },
      },
      where: {
        isAdmin: false,
        solves: {
          correct: true,
        },
      },
    });

    return users;
  }
}
