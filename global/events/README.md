### Events 异步事件 采用发布订阅模式
**发布订阅模式：发布者 发布事件 订阅者 订阅事件** <br/>
1. 引入events
```
const eventEmitter = require('event')
```
2. 发布名称为event的事件 .emit(事件名称, 传递参数(可以传递多项))
```
const bus = net eventEmitter()
// 发布事件时可传递多个参数
bus.emit('event', 'event1初始发布事件', {name: xsanjin, phone: 123})
bus.emit('event', 'event二次发布事件, ['xanjin', {type: Arrary}]')
bus.emit('event1', 'event1初始发布事件, ['xanjin', {type: Arrary}]')
```
2. 订阅发布事件 .on(事件名称, 执行函数)
* 订阅事件名称同发布事件名称需对应，且nodejs默认最多只能订阅10个事件
> 可以设置setMaxListeners(20)调整限额；
> getMAxListeners()获取当前订阅事件的最大限额
```
bus.on('event', (str, params) => {
  console.log('订阅', str, ':', params)
})
// 单次订阅 .once(事件名称, 执行函数)
// 无论发布者发布多少事件，只会触发初始发布事件
bus.once('event', (str, params) => {
  console.log('订阅', str, ':', params)
})
```
3. 删除订阅事件 事件名称和执行函数需分别对应
```
// 订阅的执行函数必须具备函数名，而不能是匿名函数
// 保证删除和订阅时为同一个执行函数
bus.off('event', (str, params) => {
  console.log('订阅', str, ':', params)
}) // 此操作无效

//修改如下
const fun = (str, params) => {
  console.log('订阅', str, ':', params)
}
bus.on('event', fun)
bus.off('event', fun)
```
**.once()单次订阅事件是无法删除的！**
* 拓展：
> process同样可以调用.on()、.emit()、.once()、.off()等方法；nodejs在底层处理时将events引入并通过ObjectSetPrototypeOf()将其原型上的内容嫁接给process的原型
> 1. 抽空了解一下设计模式
> 2. 未来课堂在师生课堂互动采取的设计模式
> 3. 灵创在章节数据管理时的设计模式

 