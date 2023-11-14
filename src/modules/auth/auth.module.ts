import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/shared/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccessStrategy } from './strategies/access.strategy';
import { RefreshStrategy } from './strategies/refresh.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secretOrPrivateKey: config.get('ACCESS_TOKEN_SECRET'),
        signOptions: config.get('ACCESS_TOKEN_EXPIRES_IN'),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessStrategy, RefreshStrategy, JwtService],
})
export class AuthModule {}
