// 验证传递参数格式
import { IsNotEmpty } from 'class-validator';
// 转换参数格式
import { Transform } from 'class-transformer';
export class UserDto{
  @IsNotEmpty({ message: '用户名不能为空' })
  @Transform((user) => user.value.trim())
  name: String;

  @IsNotEmpty({message: '密码不能为空'})
  password: String;
}