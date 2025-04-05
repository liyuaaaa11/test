// 验证技术文章参数
import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';
export class TeachShareDto {
  @IsNotEmpty({ message: '标题不能为空' })
  @Transform((title) => title.value.trim())
  title: string;

  @IsNotEmpty({ message: '内容不能为空' })
  content: string;

  @IsInt()
  userId?: number;
}