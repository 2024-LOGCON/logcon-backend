import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../shared/entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(body: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(body);
    await this.categoryRepository.save(newCategory);
    return newCategory;
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new HttpException(
        `Category with ID "${id}" not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return category;
  }

  async update(id: string, body: UpdateCategoryDto) {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }

    const res = await this.categoryRepository.update({ id }, body);

    return res;
  }

  async remove(id: string): Promise<void> {
    const result = await this.categoryRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }
  }
}
