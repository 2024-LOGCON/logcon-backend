import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Challenge } from '../../shared/entities/challenge.entity';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(Challenge)
    private challengeRepository: Repository<Challenge>,
  ) {}

  async create(createChallengeDto: CreateChallengeDto): Promise<Challenge> {
    const newChallenge = this.challengeRepository.create(createChallengeDto);
    await this.challengeRepository.save(newChallenge);
    return newChallenge;
  }

  async findAll(): Promise<Challenge[]> {
    return this.challengeRepository.find();
  }

  async findOne(id: string): Promise<Challenge> {
    const challenge = await this.challengeRepository.findOne({ where: { id } });
    if (!challenge) {
      throw new NotFoundException(`Challenge with ID "${id}" not found`);
    }
    return challenge;
  }

  async update(
    id: string,
    updateChallengeDto: UpdateChallengeDto,
  ): Promise<Challenge> {
    const challenge = await this.findOne(id);
    if (!challenge) {
      throw new NotFoundException(`Challenge with ID "${id}" not found`);
    }
    const updatedChallenge = this.challengeRepository.merge(
      challenge,
      updateChallengeDto,
    );
    await this.challengeRepository.save(updatedChallenge);
    return updatedChallenge;
  }

  async remove(id: string): Promise<void> {
    const result = await this.challengeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Challenge with ID "${id}" not found`);
    }
  }
}
