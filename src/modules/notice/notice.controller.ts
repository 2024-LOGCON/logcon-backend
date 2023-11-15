import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Post()
  async create(@Body() body: CreateNoticeDto) {
    return await this.noticeService.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateNoticeDto) {
    return await this.noticeService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.noticeService.remove(id);
  }
}
