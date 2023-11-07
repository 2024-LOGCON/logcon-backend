import { Module } from '@nestjs/common';
import { RootController } from './root.controller';
import { RootService } from './root.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigValidator } from 'src/validators/config';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [path.resolve(`src/env/${process.env.NODE_ENV}.env`)],
      validationSchema: ConfigValidator,
    }),
  ],
  controllers: [RootController],
  providers: [RootService],
})
export class RootModule {}
