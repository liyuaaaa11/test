// 提供注射器
import { injectable } from 'inversify';

// 通过装饰器注入
@injectable()
export class UserService {
  public getList() {
    return 'Hello World';
  }
  public create() {
    return 'Create User Success';
  }
}