import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';
import { Challenge } from '../../shared/entities/challenge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge])],
  controllers: [ChallengeController],
  providers: [ChallengeService],
})
export class ChallengeModule {}
