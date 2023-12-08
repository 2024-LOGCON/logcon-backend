import { IsOptional, IsString, IsInt, IsBoolean } from 'class-validator';

export class UpdateChallengeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  connection?: string;

  @IsOptional()
  @IsString()
  flag?: string;

  @IsOptional()
  @IsInt()
  point?: number;

  @IsOptional()
  @IsString()
  file?: string;

  @IsOptional()
  @IsBoolean()
  visible?: boolean;

  @IsOptional()
  @IsString()
  categoryId?: string;
}
