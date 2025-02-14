// Description: The entry point of the application.
import { InversifyExpressServer } from 'inversify-express-utils';
// 
import { Container } from 'inversify';

const container = new Container();
const server = new InversifyExpressServer(container);
const app = server.build();


// import express from 'express';
// import UserRouter from './user/user.dto';
// const app = express();
// app.use('user', UserRouter);
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});