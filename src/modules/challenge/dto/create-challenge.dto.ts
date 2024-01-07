import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { ChallengeType } from 'src/shared/entities';

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

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ChallengeType)
  type: ChallengeType;

  @ApiProperty()
  @IsOptional()
  @IsString()
  imageId?: string;
}
