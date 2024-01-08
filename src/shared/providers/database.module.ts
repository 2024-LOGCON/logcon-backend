import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '../entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        host: config.get('DB_HOST'),
        database: config.get('DB_NAME'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        port: parseInt(config.get('DB_PORT')),
        entities: entities,
        synchronize: true,
        type: 'mysql',
        timezone: '+09:00',
      }),
    }),
  ],
})
export class DatabaseModule {}
