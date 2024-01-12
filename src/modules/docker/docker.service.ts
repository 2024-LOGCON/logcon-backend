import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as Dockerode from 'dockerode';
import { Challenge, ChallengeType, Docker } from 'src/shared/entities';
import { Repository } from 'typeorm';

@Injectable()
export class DockerService {
  private docker: Dockerode;

  constructor(
    @InjectRepository(Docker)
    private readonly dockerRepository: Repository<Docker>,
    @InjectRepository(Challenge)
    private readonly challengeRepository: Repository<Challenge>,
    private readonly configService: ConfigService,
  ) {
    this.docker = new Dockerode({ socketPath: '/var/run/docker.sock' });
  }

  async getContainers() {
    return await this.docker.listContainers();
  }

  async getImages() {
    return await this.docker.listImages();
  }

  public async startContainer(challengeId: string, user: Express.User) {
    const challenge = await this.challengeRepository.findOne({
      where: { id: challengeId },
    });

    if (!challenge || challenge.type !== ChallengeType.DOCKER) {
      throw new HttpException('Challenge not found', HttpStatus.NOT_FOUND);
    }

    const docker = await this.dockerRepository.findOne({
      where: {
        challenge: {
          id: challengeId,
        },
        user: {
          id: user.id,
        },
      },
      relations: ['challenge', 'user'],
    });

    if (docker) {
      return {
        host: `${this.configService.get('SERVICE_DOMAIN')}`,
        port: docker.port,
      };
    }

    const ports = (
      await this.dockerRepository.find({
        select: { port: true },
      })
    ).map((item) => item.port);

    let port = Math.floor(Math.random() * 10000 + 20000);

    while (ports.includes(port)) {
      port = Math.floor(Math.random() * 10000 + 20000);
    }

    this.docker.createContainer(
      {
        Image: challenge.imageId,
        Tty: true,
        HostConfig: {
          PortBindings: {
            [`3000/tcp`]: [
              {
                HostPort: `${port}`,
              },
            ],
          },
        },
      },
      async (err, container) => {
        if (err) {
          throw new HttpException(err, 500);
        }

        await container.start();

        await this.dockerRepository.save({
          challenge,
          containerId: container.id,
          user,
          port,
        });

        setInterval(
          async () => {
            try {
              await container.stop();
            } catch (err) {
              Logger.error(err, 'DockerService');
            }

            await this.dockerRepository.delete({ containerId: container.id });
          },
          1000 * 60 * 60,
        );
      },
    );

    return {
      host: `${this.configService.get('SERVICE_DOMAIN')}`,
      port,
    };
  }
}
