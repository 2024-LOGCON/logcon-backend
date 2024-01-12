import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from 'src/shared/entities';
import { Repository } from 'typeorm';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {}

  @WebSocketServer()
  server: Server;

  public async create(createNoticeDto: CreateNoticeDto) {
    const notice = this.noticeRepository.create(createNoticeDto);
    await this.noticeRepository.save(notice);

    return createNoticeDto;
  }

  public async findAll() {
    return await this.noticeRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  public async update(id: string, updateNoticeDto: UpdateNoticeDto) {
    const notice = await this.noticeRepository.findOneBy({ id });

    if (!notice)
      throw new HttpException('Notice not found', HttpStatus.NOT_FOUND);

    Object.assign(notice, updateNoticeDto);

    await this.noticeRepository.save(notice);

    return notice;
  }

  public async remove(id: string) {
    const notice = await this.noticeRepository.findOneBy({ id });

    if (!notice)
      throw new HttpException('Notice not found', HttpStatus.NOT_FOUND);

    await this.noticeRepository.remove(notice);

    return notice;
  }
}
