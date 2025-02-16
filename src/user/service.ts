// 提供注射器
import { injectable, inject } from 'inversify';
// 引入封装的数据库
import { PrismaDB } from '../db';
import { UserDto } from './user.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

// 通过装饰器注入
@injectable()
export class UserService {
  constructor(@inject(PrismaDB) private readonly PrismaDB: PrismaDB) {

  }
  public async getList() {
    return await this.PrismaDB.prisma.user.findMany();
  }
  public async create(user: UserDto) {
    // 将最后的结果合并到UserDto中
    let userDto = plainToClass(UserDto, user);
    // 验证参数是否合法
    const errors = await validate(userDto);
    console.log(errors, user);
    if (errors.length > 0) {
      throw new Error(errors.toString());
    } else {
      return await this.PrismaDB.prisma.user.create({
        data: user
      })
    }
  }
}