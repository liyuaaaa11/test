import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const UserRouter:any  = express.Router();
class User {
  constructor() {
    console.log('User class created');
  }
  async create() {
    console.log('User created');
    UserRouter.post('/create', async (req: express.Request, res: express.Response) => {
      console.log('User created', req.body);
      const {name, password} = req.body;
      const data = await prisma.user.create({
        data: {
          name,
          password
        }
      }).catch((e) => {
        console.log(e);
      });
      res.send(data);
    });
  }
  async get() {
    console.log('User get');
    UserRouter.get('/info:id', async (req: express.Request, res: express.Response) => {
      console.log('User get');
      const data = await prisma.user.findMany({
        where: {
          id: Number(req.params.id)
        }
      });
      res.send(data);
    });
  }
  async update() {
    console.log('User update');
    UserRouter.put('/user/edit', async (req: express.Request, res: express.Response) => {
      console.log('User update');
      const data = await prisma.user.update({
        where: {
          id: Number(req.body.id)
        },
        data: {
          name: req.body.name,
          password: req.body.password
        }
      });
      res.send(data);
    });
  }
  async delete() {
    console.log('User delete');
    UserRouter.delete('/del', async (req: express.Request, res: express.Response) => {
      console.log('User delete');
      await prisma.model.deleteMany({
        where: {
          userId: Number(req.body.id)
        }
      })

      await prisma.user.delete({
        where: {
          id: Number(req.body.id)
        }
      }).then(() => {
        res.send('User delete');
        console.log('User delete');
      }).catch((e) => {
        console.log(e);
      });
    });
  }
}
const user = new User();
console.log(UserRouter.post)
user.create();
user.get();
user.update();
user.delete();
export default UserRouter;