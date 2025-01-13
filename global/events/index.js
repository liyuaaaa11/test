const eventEmitter = require('events');
// 类似于vue2 中的eventBus 第三方库mitt 采用发布订阅模式
// 发布订阅模式 off删除事件  on订阅事件 emit发布事件 once触发事件
const bus = new eventEmitter();
// 订阅一个事件 事件名称自定义event 发布者发布时会将参数携带过来params
const fun = (params, obj) => {
  console.log('触发了event事件', params, obj);
}
// nodejs默认只能监听10个事件，如果超过10个事件，会报错
// 可以设置setMaxListeners来修改默认值
bus.setMaxListeners(20); // 设置最大监听事件数
console.log(bus.getMaxListeners()); // 获取监听的事件限制 20
bus.on('event', fun);
// 删除一个事件 对应的事件名称和订阅的函数
// 注意⚠️：删除事件时，订阅的函数必须是具名函数，而不能是匿名函数；且无法删除once订阅的事件
bus.off('event', fun);
// 订阅一次事件 即无论发布多少次事件 只会触发一次
bus.once('event', fun);

Object.prototype
// 发布一个事件 发布事件的名称event  传递参数'发布事件'(可传递多个参数)
bus.emit('event', '发布事件', {name: 'xsanjin'});
bus.emit('event', '发布事件2', {name: 'xsanjin2'});
bus.emit('event', '发布事件3', { name: 'xsanjin3' });
