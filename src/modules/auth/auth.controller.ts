import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { RefreshGuard } from './guards/refresh.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AccessGuard } from './guards/access.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Res() res: Response, @Body() registerDto: RegisterDto) {
    const accessToken = await this.authService.register(registerDto);

    res.cookie('ACCESS_TOKEN', accessToken);
    res.send(accessToken);
  }

  @Post('/login')
  async login(@Res() res: Response, @Body() loginDto: LoginDto) {
    const refreshToken = await this.authService.login(loginDto);

    res.cookie('REFRESH_TOKEN', refreshToken);
    res.send(refreshToken);
  }

  @Post('/logout')
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  async logout(@Res() res: Response) {
    res.clearCookie('REFRESH_TOKEN');
    res.send('ok');
  }

  @Get('/refresh')
  @UseGuards(RefreshGuard)
  async refresh(@Req() req: Request) {
    return await this.authService.generateAccessToken(req.user);
  }
}
