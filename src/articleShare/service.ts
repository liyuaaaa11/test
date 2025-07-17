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
    // 将type为1和2的文章分别查询出来
    // 并且按照创建时间降序排列
    // 最后将结果合并成一个数组返回
    // 这里使用PrismaDB来查询数据
    // 只查询前端和后端的文章
    // 这里使用PrismaDB来查询数据
    // 只查询前端和后端的文章


    const data = await this.PrismaDB.prisma.articleShare.findMany({
      where: {
        type: { in: [1, 2]
        }
      },
      orderBy: {
        createTime: 'desc'
      },
      select: {
        id: true,
        title: true,
        desc: true,
        type: true,
        content: true,
        createTime: true,
        updatedTime: true
      }
    }).then((data) => {
      // 将查询结果按照type分组
      return data.reduce((acc, item) => {
        if (!acc[item.type]) {
          acc[item.type] = [];
        }
        acc[item.type].push(item);
        return acc;
      }, {});
    });
    console.log('data*************');
    console.log(data);
    return [
      {
        id: 1,
        type: 1,
        name: '前端',
        list: data[1] || [] // 如果没有前端文章则返回空数组
      },
      {
        id: 2,
        type: 2,
        name: '后端',
        list: data[2] || [] // 如果没有后端文章则返回空数组
      },
    ]
  }
  public async create(articleShare: ArticleShareDto) {
    // 将最后的结果合并到UserDto中
    let articleShareDto = plainToClass(ArticleShareDto, articleShare);
    // 验证参数是否合法
    const errors = await validate(articleShareDto);
    console.log('errors*************', errors.length);
    console.log(errors, articleShare);
    if (errors.length > 0) {
      return errors
    } else {
      const data = {
        title: articleShareDto.title,
        desc: articleShareDto.desc,
        userId: 1, // 如果没有传userId则默认为0
        type: articleShareDto.type || 0, // 如果没有传type则默认为0
        content: articleShareDto.content || '' // 如果没有传content则默认为空字符串
      };
      let result = await this.PrismaDB.prisma.articleShare.create({
        data: data
      })
      console.log('result*************');
      console.log(result);
      // 返回结果
      return {
        ...result,
        token: this.JWT.creatToken(result)
      }
    }
  }
}