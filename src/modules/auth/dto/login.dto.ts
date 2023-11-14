import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email of the student',
  })
  @IsString()
  email!: string;

  @ApiProperty({
    description: 'Password of the student',
  })
  @IsString()
  password!: string;
}
