import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/shared/entities';
import { AdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAdmin(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return user?.isAdmin ? user : null;
  }

  async createAdmin({ email }: AdminDto) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    user.isAdmin = true;
    await this.userRepository.save(user);
    return user;
  }
}
