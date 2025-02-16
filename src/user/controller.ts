// 控制层只处理路由 通过service层调用实现具体的业务逻辑
// 注入器  injectable封装到里面
// 类似nextjs
import { controller, httpGet as Get, httpPost as Post } from 'inversify-express-utils';
// 类似springboot
// import { controller, httpGet as GetMapping, httpPost as PostMapping } from 'express';
import { UserService } from './service';
import { inject } from 'inversify';

import type { Request, Response } from 'express';

// 装饰器 类似路由可以接入路由地址
@controller('/user')
export class UserController {
  // 控制器的构造函数 可以相互调用service层 私有不能更改的装饰器
  constructor(@inject(UserService) private readonly userService: UserService) {
    console.log('User Controller Created');
  }
  @Get('/')
  public async getIndex(req: Request, res: Response) {
    let result = await this.userService.getList();
    res.send(result);
  }
  @Post('/create')
  public async create(req: Request, res: Response) {
    console.log('User created', req.body);
    let result = await this.userService.create(req.body);
    res.send(result);
  }
}