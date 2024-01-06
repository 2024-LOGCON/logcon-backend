import { IsString } from 'class-validator';

export class SolveDto {
  @IsString()
  flag: string;
}

export class SolveResDto {
  correct: boolean;
}
