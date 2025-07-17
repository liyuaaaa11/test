//  技术文章
// 引入
import { injectable, inject } from 'inversify';
// 引入封装的数据库
import { PrismaDB } from '../db/index.js';
import { ArticleShareDto } from './articleShare.dto.js';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { JWT } from '../jwt/index.js';

@injectable()
export class ArticleShareService {
  constructor(
    @inject(PrismaDB) private readonly PrismaDB: PrismaDB,
    @inject(JWT) private readonly JWT: JWT
  ) {
    console.log('TeachShare Service Created');
  }
  public async getList() {
    // select type = 1 table
    // select type = 2 table
    // 这里可以使用事务来保证数据的一致性
    const data = this.PrismaDB.prisma.$transaction([
      this.PrismaDB.prisma.articleShare.findMany({
        where: {
          type: 1
        }
      }),
      this.PrismaDB.prisma.articleShare.findMany({
        where: {
          type: 2
        }
      })
    ]);
    return [
      {
        id: 1,
        type: 1,
        name: '前端',
        list: data[0]
      },
      {
        id: 2,
        type: 2,
        name: '后端',
        list: data[1]
      },
    ]
  }
  public async create(articleShare: ArticleShareDto) {
    // 将最后的结果合并到UserDto中
    let userDto = plainToClass(ArticleShareDto, articleShare);
    // 验证参数是否合法
    const errors = await validate(userDto);
    console.log(errors, articleShare);
    if (errors.length > 0) {
      return errors
    } else {
      const data = {
        title: userDto.title,
        desc: userDto.desc,
        userId: userDto.userId || 1, // 如果没有传userId则默认为0
        type: userDto.type || 0, // 如果没有传type则默认为0
        content: userDto.content || '' // 如果没有传content则默认为空字符串
      };
      let result = await this.PrismaDB.prisma.articleShare.create({
        data: data
      })
      console.log(this.JWT.creatToken(result))
      return {
        ...result,
        token: this.JWT.creatToken(result)
      }
    }
  }
}