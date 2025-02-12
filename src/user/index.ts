import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default class User {
  UserRouter = express.Router();
  constructor() {
    console.log('User class created');
  }
  async create() {
    console.log('User created');
    this.UserRouter.post('/user', async (req, res) => {
      console.log('User created');
      await prisma.user.create({
        data: {
          name: 'Alice',
          password: '123456',
        },
      })
      res.send('User created');
    });
  }
  async get() {
    console.log('User get');
    this.UserRouter.get('/user', async (req, res) => {
      console.log('User get');
      res.send('User get');
    });
  }
  async update() {
    console.log('User update');
    this.UserRouter.put('/user', async (req, res) => {
      console.log('User update');
      res.send('User update');
    });
  }
  async delete() {
    console.log('User delete');
    this.UserRouter.delete('/user', async (req, res) => {
      console.log('User delete');
      res.send('User delete');
    });
  }
}