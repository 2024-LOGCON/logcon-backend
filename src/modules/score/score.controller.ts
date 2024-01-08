import { Controller, Get, UseGuards } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessGuard } from '../auth/guards/access.guard';

@Controller('score')
@ApiTags('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  async findAll() {
    return await this.scoreService.findAll();
  }
}
