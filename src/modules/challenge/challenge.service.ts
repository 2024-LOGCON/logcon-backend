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
import { Solve } from 'src/shared/entities';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(Challenge)
    private challengeRepository: Repository<Challenge>,
    @InjectRepository(Solve)
    private solveRepository: Repository<Solve>,
  ) {}

  async create(body: CreateChallengeDto): Promise<Challenge> {
    const newChallenge = this.challengeRepository.create({
      ...body,
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
      where: { challenge, user, correct: true },
    });

    if (solve) {
      throw new HttpException('You already solved this challenge', 400);
    }

    const correct = challenge.flag === flag;

    await this.solveRepository.save({
      challenge,
      user,
      flag,
      correct,
    });

    return { correct };
  }
}
