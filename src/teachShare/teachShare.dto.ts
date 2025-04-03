// 验证技术文章参数
import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { IsInt } from 'class-validator';
import { IsDate } from 'class-validator';
export class TeachShareDto {
  @IsNotEmpty({ message: '标题不能为空' })
  @Transform((title) => title.value.trim())
  title: string;

  @IsNotEmpty({ message: '内容不能为空' })
  content: string;

  @IsString()
  tags?: string;


  @IsInt()
  userId?: number;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}