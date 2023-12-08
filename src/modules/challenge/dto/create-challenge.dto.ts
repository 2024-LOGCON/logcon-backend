import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  IsBoolean,
} from 'class-validator';

export class CreateChallengeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  connection?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  flag: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  file?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
