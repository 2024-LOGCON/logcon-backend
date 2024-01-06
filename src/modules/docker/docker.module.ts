import { Module } from '@nestjs/common';
import { DockerService } from './docker.service';
import { DockerController } from './docker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge, Docker } from 'src/shared/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Docker, Challenge])],
  controllers: [DockerController],
  providers: [DockerService],
})
export class DockerModule {}
