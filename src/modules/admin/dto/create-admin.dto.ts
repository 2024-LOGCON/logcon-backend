import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AdminDto {
  @ApiProperty({
    description: 'Email of the Admin',
  })
  @IsString()
  email!: string;
}
