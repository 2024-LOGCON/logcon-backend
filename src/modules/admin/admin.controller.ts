import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { DebugGuard } from './guards/debug.guard';
import { AdminDto } from './dto/create-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/')
  @UseGuards(DebugGuard)
  createAdmin(@Body() adminDto: AdminDto) {
    return this.adminService.createAdmin(adminDto);
  }
}
