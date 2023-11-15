import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeGateway } from './notice.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from 'src/shared/entities';
import { NoticeController } from './notice.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Notice])],
  providers: [NoticeGateway, NoticeService],
  controllers: [NoticeController],
})
export class NoticeModule {}
