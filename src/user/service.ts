// 提供注射器
import { injectable, inject } from 'inversify';
// 引入封装的数据库
import { PrismaDB } from '../db';

// 通过装饰器注入
@injectable()
export class UserService {
  constructor(@inject(PrismaDB) private readonly PrismaDB: PrismaDB) {

  }
  public async getList() {
    return await this.PrismaDB.prisma.user.findMany();
  }
  public async create(user: any) {
    return await this.PrismaDB.prisma.user.create({
      data: user
    }).catch((e) => {
      console.log(e);
    });
  }
}