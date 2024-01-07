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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessGuard } from './guards/access.guard';
import { User } from 'src/decorators/user';
import { REFRESH_TOKEN_KEY, REFRESH_TOKEN_OPTION } from 'src/utils/cookie';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  async hello(@User() user: Express.User) {
    return await this.authService.getUserByEmail(user.email);
  }

  @Post('/register')
  async register(@Res() res: Response, @Body() registerDto: RegisterDto) {
    const refreshToken = await this.authService.register(registerDto);

    res.cookie(REFRESH_TOKEN_KEY, refreshToken, REFRESH_TOKEN_OPTION());
    res.send(refreshToken);
  }

  @Post('/login')
  async login(@Res() res: Response, @Body() loginDto: LoginDto) {
    const refreshToken = await this.authService.login(loginDto);

    res.cookie(REFRESH_TOKEN_KEY, refreshToken, REFRESH_TOKEN_OPTION());
    res.send(refreshToken);
  }

  @Post('/logout')
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  async logout(@Res() res: Response) {
    res.clearCookie(REFRESH_TOKEN_KEY);
    res.send('ok');
  }

  @Get('/refresh')
  @UseGuards(RefreshGuard)
  async refresh(@Req() req: Request) {
    return await this.authService.generateAccessToken(req.user);
  }
}
