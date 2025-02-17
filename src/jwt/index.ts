import { injectable } from 'inversify';
import passport from 'passport';
import jsonwebtoken from 'jsonwebtoken';
import { Strategy, ExtractJwt } from 'passport-jwt';

@injectable()
export class JWT {
  private secret = 'xsanjin%_test_%'
  private jstOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: this.secret
  }

  constructor() {
    this.strategy()
  }
  // 注入passport-jwt插件
  strategy() {
    let str = new Strategy(this.jstOptions, (payload, done) => {
      done(null, payload)
    })
    // passport注入使用passport-jwt插件
    passport.use(str)
  }
  // 中间件
  static middleware() {
    // 设置经过jwt验证
    return passport.authenticate('jwt', { session: false })
  }
  // 生成token
  public creatToken(data: object) {
    // 第一个参数 payload 载荷
    // 第二个参数 secretOrPrivateKey secret或者私钥
    // 第三个参数 设置token的过期时间 h(小时) d(天)
    console.log(data)
    return jsonwebtoken.sign(data, this.secret, {expiresIn: '1d'})
  }
  // 与express建立连接
  public init() {
    return passport.initialize()
  }
}