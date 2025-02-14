import express from 'express';
import UserRouter from './user/index';
const app = express();
app.use(express.json()); // 支持post请求
app.use('user', UserRouter);
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});