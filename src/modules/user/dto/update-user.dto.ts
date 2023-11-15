import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Name of the student',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'School of the student',
  })
  @IsString()
  school!: string;
}
