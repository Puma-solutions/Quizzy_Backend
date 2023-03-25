import { Router } from "express";
export const authRouter = Router();

import { AuthController } from "../controllers/auth.controller";

authRouter.post(('/register'),AuthController.register)
authRouter.post(('/login'),AuthController.login)