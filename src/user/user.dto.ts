// 验证传递参数格式
import { IsNotEmpty } from 'class-validator';
// 转换参数格式
import { Transform } from 'class-transformer';
export class UserDto{
  @IsNotEmpty({ message: '用户名不能为空' })
  @Transform((user) => user.value.trim())
  username: string;

  @IsNotEmpty({message: '密码不能为空'})
  password: string;

  @IsNotEmpty({ message: '邮箱不能为空' })
  @Transform((email) => email.value.trim())
  email: string;

  @IsNotEmpty({ message: '角色不能为空' })
  @Transform((role) => role.value.trim())
  role: number;

  @IsNotEmpty({ message: '年级不能为空' })
  @Transform((grade) => grade.value.trim())
  grade: string;

  @IsNotEmpty({ message: '学科不能为空' })
  @Transform((subject) => subject.value.trim())
  subject: string;
}