import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from '../../shared/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])], // 엔티티
  controllers: [CategoryController], // 컨트롤러
  providers: [CategoryService], // 서비스
})
export class CategoryModule {}
