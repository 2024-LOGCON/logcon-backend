import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { AdminGuard } from '../admin/guards/admin.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessGuard } from '../auth/guards/access.guard';
import { NoticeGateway } from './notice.gateway';

@Controller('notice')
@ApiTags('notice')
export class NoticeController {
  constructor(
    private readonly noticeService: NoticeService,
    private readonly noticeGateway: NoticeGateway,
  ) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  async findAll() {
    return await this.noticeService.findAll();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  async create(@Body() body: CreateNoticeDto) {
    this.noticeGateway.server.emit('notice', body);
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
