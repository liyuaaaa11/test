// 技术分享控制层 通过service层调用数据库
import { controller, httpGet as Get, httpPost as Post } from 'inversify-express-utils';
import {
  ArticleShareService
} from './service.js';
import { inject } from 'inversify';

import type { Request, Response } from 'express';
import { JWT } from '../jwt/index.js';

@controller('/api/teachShare')
export class ArticleShareController{
  constructor(@inject(ArticleShareService) private readonly articleShareService: ArticleShareService) {
    console.log('ArticleShare Controller Created');
  }
  @Get('/list')
  public async getIndex(req: Request, res: Response) {
    let result = await this.articleShareService.getList();
    res.statusCode = result.code
    res.send(result)
  }
  @Post('/create')
  public async create(req: Request, res: Response) {
    let result = await this.articleShareService.create(req.body)
    res.statusCode = result.code
    res.send(result)
  }
  @Post('update')
  public async update(req: Request, res: Response) {
    let result = await this.articleShareService.update(req.body)
    res.statusCode = result.code
    res.send(result)
  }
  @Get('/detail')
  public async detail(req: Request, res: Response) {
    let result = await this.articleShareService.detail(req.params)
    res.statusCode = result.code
    res.send(result)
  }
  @Post('delete')
  public async delete(req: Request, res: Response) {
    let result = await this, articleShareService.delete (req.body)
    res.statusCode = result.code
    res.send(result)
  }
}