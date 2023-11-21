import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  IsBoolean,
} from 'class-validator';

export class CreateChallengeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  connection?: string;

  @IsNotEmpty()
  @IsString()
  flag: string;

  @IsOptional()
  @IsInt()
  point?: number;

  @IsOptional()
  @IsString()
  file?: string;

  @IsOptional()
  @IsBoolean()
  visible?: boolean;

  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
