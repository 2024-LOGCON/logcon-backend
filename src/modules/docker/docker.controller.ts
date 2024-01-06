import { Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { DockerService } from './docker.service';
import { AdminGuard } from '../admin/guards/admin.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessGuard } from '../auth/guards/access.guard';
import { User } from 'src/decorators/user';

@Controller('docker')
@ApiTags('docker')
export class DockerController {
  constructor(private readonly dockerService: DockerService) {}

  @Post(':challengeId')
  @UseGuards(AccessGuard)
  @ApiBearerAuth()
  async startContainer(
    @Param('challengeId') challengeId: string,
    @User() user: Express.User,
  ) {
    return await this.dockerService.startContainer(challengeId, user);
  }
}
