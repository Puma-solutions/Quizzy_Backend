import { NextFunction, Request, Response } from "express";
import { UserServices } from "../services/user.services";
export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      await UserServices.register(req.body);
      res.json({ message: "User created successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const {email,password} = req.body
      const token = await UserServices.login(email,password)
      res.json({token:token})
    } catch (error) {
      next(error);
    }
  }
}
