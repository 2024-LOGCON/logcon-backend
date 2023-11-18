import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { AdminGuard } from '../admin/guards/admin.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  async create(@Body() body: CreateNoticeDto) {
    return await this.noticeService.create(body);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  async update(@Param('id') id: string, @Body() body: UpdateNoticeDto) {
    return await this.noticeService.update(id, body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  async delete(@Param('id') id: string) {
    return await this.noticeService.remove(id);
  }
}
