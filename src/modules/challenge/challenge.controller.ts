import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { AdminGuard } from '../admin/guards/admin.guard';
import { AccessGuard } from '../auth/guards/access.guard';
import { User } from 'src/decorators/user';

@ApiTags('challenge')
@Controller('challenge')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() createChallengeDto: CreateChallengeDto) {
    return this.challengeService.create(createChallengeDto);
  }

  @Get()
  @UseGuards(AccessGuard)
  async findAll(@User() user: Express.User) {
    return await this.challengeService.findAll(user);
  }

  @Get(':id')
  @UseGuards(AccessGuard)
  async findOne(@Param('id') id: string) {
    return this.challengeService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  async update(
    @Param('id') id: string,
    @Body() updateChallengeDto: UpdateChallengeDto,
  ) {
    return this.challengeService.update(id, updateChallengeDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async remove(@Param('id') id: string) {
    return this.challengeService.remove(id);
  }
}
