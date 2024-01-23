import { NextFunction, Request, Response  } from 'express';
import UserService from '../services/userService';
import UserModel from '../models/userModel';
const userService = new UserService();

async function users(_req: Request, res: Response, next: NextFunction) {
    try {
      const responseData = await userService.users('');
      if (!responseData) {
        return next();
      }
      return res.status(200).json(responseData);
    } catch (error) {
      next(error.message);
    }
  }
  async function user(_req: Request, res: Response, next: NextFunction) {
    try {
        const userId = _req.query.userId as string;
      const responseData = await userService.user(userId);
      if (!responseData) {
        return next();
      }
      return res.status(200).json(responseData);
    } catch (error) {
      next(error.message);
    }
  }
  async function insertuser(_req: Request, res: Response, next: NextFunction) {
    try {
        const user = _req.body as UserModel;
      const responseData = await userService.insertuser(user);
      if (!responseData) {
        return next();
      }
      return res.status(200).json(responseData);
    } catch (error) {
      next(error.message);
    }
  }
  export default {users, user,insertuser};