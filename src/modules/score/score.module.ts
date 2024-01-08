import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class ScoreModule {}
