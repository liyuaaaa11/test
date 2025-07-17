// 验证技术文章参数
import { isInt, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';
export class ArticleShareDto {
  @IsNotEmpty({ message: '标题不能为空' })
  @Transform((title) => title.value.trim())
  title: string;

  @IsNotEmpty({ message: '简介不能为空' })
  desc: string;
  
  @IsInt()
  userId?: number;

  @IsInt()
  type?: number;

  @IsString()
  content?: string;
}