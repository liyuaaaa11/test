import express from 'express';
import User from './user/index';
const app = express();
const user = new User();
user.create();
user.get();
user.update();
user.delete();
app.use(user.UserRouter);

app.use(express.json()); // 支持post请求

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});