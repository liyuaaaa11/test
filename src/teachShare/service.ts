//  技术文章
// 引入
import { injectable, inject } from 'inversify';
// 引入封装的数据库
import { PrismaDB } from '../db';
import { TeachShareDto } from './teachShare.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { JWT } from '../jwt';

@injectable()
export class TeachShareService {
  constructor(
    @inject(PrismaDB) private readonly PrismaDB: PrismaDB,
    @inject(JWT) private readonly JWT: JWT
  ) {
    console.log('TeachShare Service Created');
  }
  public async getList() {
    return await this.PrismaDB.prisma.teachShare.findMany();
  }
  public async create(teachShare: TeachShareDto) {
    // 将最后的结果合并到UserDto中
    let userDto = plainToClass(TeachShareDto, teachShare);
    // 验证参数是否合法
    const errors = await validate(userDto);
    console.log(errors, teachShare);
    if (errors.length > 0) {
      return errors
    } else {
      let result = await this.PrismaDB.prisma.teachShare.create({
        data: {
          ...teachShare,
          userId: teachShare.userId ?? 1 // Replace 0 with a valid default userId if necessary
        }
      })
      console.log(this.JWT.creatToken(result))
      return {
        ...result,
        token: this.JWT.creatToken(result)
      }
    }
  }
}