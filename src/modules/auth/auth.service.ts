import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/entities';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { validateEmail, validatePassword } from 'src/validators/auth';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async register({
    id,
    name,
    email,
    password,
    school,
  }: RegisterDto): Promise<string> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    if (!validateEmail(email)) {
      throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
    }

    if (!validatePassword(password)) {
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
    }

    const newUser = this.userRepository.create({
      id,
      name,
      email,
      password: await this.hashPassword(password),
      school,
    });

    await this.userRepository.save(newUser);
    return await this.generateAccessToken(newUser);
  }

  async login({ id, password }: LoginDto): Promise<string> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
    }

    return await this.generateRefreshToken(user);
  }

  async generateAccessToken(user: Express.User): Promise<string> {
    return await this.jwtService.signAsync(
      { ...user },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRES_IN'),
      },
    );
  }

  async generateRefreshToken(user: Express.User): Promise<string> {
    return await this.jwtService.signAsync(
      { ...user },
      {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRES_IN'),
      },
    );
  }

  async validateRefreshToken(refreshToken: string, email: string) {
    const user = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
    });

    return user?.email === email ? true : false;
  }
}
