import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/shared/entities';
import { validate } from 'class-validator';
import { validateName } from 'src/validators/auth';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUser(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['solves'],
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async updateUser(_user: Express.User, { name, school }: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id: _user.id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (validateName(name)) {
      throw new HttpException('Invalid name', HttpStatus.BAD_REQUEST);
    }

    user.name = name;
    user.school = school;
    await this.userRepository.save(user);

    delete user.password;
    delete user.isAdmin;
    return user;
  }

  async removeUser(_user: Express.User, id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (_user.id !== id) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    await this.userRepository.remove(user);
  }
}
