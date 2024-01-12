import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateNoticeDto {
  @ApiProperty({
    description: '공지사항 제목',
    example: '공지사항 제목',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: '공지사항 내용',
    example: '공지사항 내용',
  })
  @IsString()
  description: string;
}
