import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { DebugGuard } from './guards/debug.guard';
import { AdminDto } from './dto/create-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from './guards/admin.guard';

@Controller('admin')
@ApiTags('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @UseGuards(AdminGuard)
  check() {
    return { status: true };
  }

  @Post('/')
  @UseGuards(DebugGuard)
  createAdmin(@Body() adminDto: AdminDto) {
    return this.adminService.createAdmin(adminDto);
  }
}
