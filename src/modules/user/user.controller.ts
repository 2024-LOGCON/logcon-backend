import {
  Controller,
  Get,
  Body,
  Param,
  UseGuards,
  Req,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AccessGuard } from '../auth/guards/access.guard';
import { Request } from 'express';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  async findOne(@Param('id') id: string) {
    return await this.userService.findUser(id);
  }

  @Patch('')
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  async update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(req.user, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AccessGuard)
  async remove(@Req() req: Request, @Param('id') id: string) {
    return await this.userService.removeUser(req.user, id);
  }
}
