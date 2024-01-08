import { Module } from '@nestjs/common';
import { RootController } from './root.controller';
import { RootService } from './root.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigValidator } from 'src/validators/config';
import * as path from 'path';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from 'src/shared/providers/database.module';
import { AdminModule } from '../admin/admin.module';
import { UserModule } from '../user/user.module';
import { NoticeModule } from '../notice/notice.module';
import { CategoryModule } from '../category/category.module';
import { ChallengeModule } from '../challenge/challenge.module';
import { DockerModule } from '../docker/docker.module';
import { ScoreModule } from '../score/score.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [path.resolve(`src/env/${process.env.NODE_ENV}.env`)],
      validationSchema: ConfigValidator,
    }),
    AuthModule,
    DatabaseModule,
    AdminModule,
    UserModule,
    NoticeModule,
    CategoryModule,
    ChallengeModule,
    DockerModule,
    ScoreModule,
  ],
  controllers: [RootController],
  providers: [RootService],
})
export class RootModule {}
