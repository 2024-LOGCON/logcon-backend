import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Id of the student',
  })
  @IsString()
  id!: string;

  @ApiProperty({
    description: 'Password of the student',
  })
  @IsString()
  password!: string;
}
