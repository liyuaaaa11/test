process.on('message', msg => {
  console.log('子进程收到消息：', msg)
})

process.send('这里是子进程， 收到请回复！')