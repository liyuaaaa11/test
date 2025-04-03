// 技术分享控制层 通过service层调用数据库
import { controller, httpGet as Get, httpPost as Post } from 'inversify-express-utils';
import { TeachShareService } from './service';
import { inject } from 'inversify';

import type { Request, Response } from 'express';
import { JWT } from '../jwt';

@controller('/teachShare')
export class TeachShareController{
  constructor(@inject(TeachShareService) private readonly teachShareService: TeachShareService) {
    console.log('TeachShare Controller Created');
  }
  @Get('/list')
  public async getIndex(req: Request, res: Response) {
    let result = await this.teachShareService.getList();
    res.send(result)
  }
  @Post('/create')
  public async create(req: Request, res: Response) {
    let result = await this.teachShareService.create(req.body)
    res.send(result)
  }
}