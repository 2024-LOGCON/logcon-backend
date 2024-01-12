import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Challenge } from '../../shared/entities/challenge.entity';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { Solve, User } from 'src/shared/entities';
import { sha256 } from 'src/utils/enc';
import { calculateScore } from 'src/utils/score';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(Challenge)
    private challengeRepository: Repository<Challenge>,
    @InjectRepository(Solve)
    private solveRepository: Repository<Solve>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(body: CreateChallengeDto): Promise<Challenge> {
    const newChallenge = this.challengeRepository.create({
      ...body,
      flag: sha256(body.flag),
      category: {
        id: body.categoryId,
      },
    });

    await this.challengeRepository.save(newChallenge);
    return newChallenge;
  }

  async findAll(user?: Express.User): Promise<Challenge[]> {
    const isAdmin = user && user?.isAdmin;

    return await this.challengeRepository.find({
      where: { visible: isAdmin ? undefined : true },
    });
  }

  async findOne(id: string): Promise<Challenge> {
    const challenge = await this.challengeRepository.findOneBy({ id });
    if (!challenge) {
      throw new HttpException(
        `Challenge with ID "${id}" not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return challenge;
  }

  async update(id: string, body: UpdateChallengeDto) {
    const challenge = await this.findOne(id);
    if (!challenge) {
      throw new HttpException(
        `Challenge with ID "${id}" not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const res = await this.challengeRepository.update(
      { id },
      { ...body, category: { id: body.categoryId } },
    );

    return res;
  }

  async remove(id: string) {
    const res = await this.challengeRepository.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`Challenge with ID "${id}" not found`);
    }

    return res;
  }

  async solve(id: string, flag: string, user: Express.User) {
    const challenge = await this.findOne(id);

    if (!challenge) {
      new HttpException('Challenge not found', HttpStatus.NOT_FOUND);
    }

    const solve = await this.solveRepository.findOne({
      relations: ['user', 'challenge'],
      select: ['id'],
      where: {
        challenge: {
          id: challenge.id,
        },
        user: {
          id: user.id,
        },
        correct: true,
      },
    });

    if (solve) {
      throw new HttpException('You already solved this challenge', 400);
    }

    const correct = challenge.flag === sha256(flag);

    await this.solveRepository.save({
      challenge,
      user,
      flag: sha256(flag),
      correct,
    });

    if (correct) {
      const users = await this.userRepository
        .createQueryBuilder('user')
        .select(['user.id', 'user.score'])
        .leftJoinAndSelect('user.solves', 'solve')
        .where('solve.correct = :correct', { correct: true })
        .getMany();

      const score = calculateScore(users.length - 1);

      await this.challengeRepository.update(
        {
          id: challenge.id,
        },
        {
          point: score,
        },
      );

      users.forEach(async (_user) => {
        await this.userRepository.update(
          {
            id: _user.id,
          },
          {
            score:
              user.id === _user.id
                ? _user.score + score
                : _user.score - challenge.point + score,
          },
        );
      });
    }

    return { correct };
  }
}
