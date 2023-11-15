import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Id of the student',
  })
  @IsString()
  id!: string;

  @ApiProperty({
    description: 'Name of the student',
  })
  @IsString()
  name!: string;

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

  @ApiProperty({
    description: 'School of the student',
  })
  @IsString()
  school!: string;
}
