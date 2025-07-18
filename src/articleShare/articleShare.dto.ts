// 验证技术文章参数
import { IsInt, IsNotEmpty, IsString, IsJSON } from 'class-validator';
import { Transform } from 'class-transformer';
export class ArticleShareDto  {
  @IsNotEmpty({ message: '标题不能为空' })
  @Transform((title) => title.value.trim())
  title: string;

  @IsNotEmpty({ message: '简介不能为空' })
  desc: string;

  @IsInt()
  type?: number;
  id?: number;


  @IsJSON()
  content?: object;
}