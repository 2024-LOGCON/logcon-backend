import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AdminGuard } from '../admin/guards/admin.guard';
import { AccessGuard } from '../auth/guards/access.guard';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() body: CreateCategoryDto) {
    return await this.categoryService.create(body);
  }

  @Get()
  @UseGuards(AccessGuard)
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  @UseGuards(AccessGuard)
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async remove(@Param('id') id: string) {
    return await this.categoryService.remove(id);
  }
}
