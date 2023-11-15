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
  findOne(@Param('id') id: string) {
    return this.userService.findUser(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(req.user, id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AccessGuard)
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.userService.removeUser(req.user, id);
  }
}
