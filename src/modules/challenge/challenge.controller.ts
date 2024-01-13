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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { AdminGuard } from '../admin/guards/admin.guard';
import { AccessGuard } from '../auth/guards/access.guard';
import { User } from 'src/decorators/user';
import { SolveDto, SolveResDto } from './dto/solve.dto';

@ApiTags('challenge')
@Controller('challenge')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Post()
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  async create(@Body() createChallengeDto: CreateChallengeDto) {
    return await this.challengeService.create(createChallengeDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  async findAll(@User() user: Express.User) {
    return await this.challengeService.findAll(user);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  async findOne(@Param('id') id: string) {
    return await this.challengeService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  async update(
    @Param('id') id: string,
    @Body() updateChallengeDto: UpdateChallengeDto,
  ) {
    return await this.challengeService.update(id, updateChallengeDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  async remove(@Param('id') id: string) {
    return await this.challengeService.remove(id);
  }

  @Post('fix')
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  async fix() {
    return await this.challengeService.fix();
  }

  @Post('solve/:id')
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  async solve(
    @Param('id') id: string,
    @Body() body: SolveDto,
    @User() user: Express.User,
  ): Promise<SolveResDto> {
    return await this.challengeService.solve(id, body.flag, user);
  }
}
