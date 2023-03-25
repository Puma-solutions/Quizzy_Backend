import jwt , {JwtPayload} from "jsonwebtoken";
import { SECRET } from "../utils/config";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const authMiddleware = (req: Request,res: Response,next: NextFunction) => {
  const authorization = req.get("authorization");
  if (authorization) {
    let token = "";

    if (authorization && authorization.toLowerCase().startsWith("bearer")) {
        token = authorization.substring(7);
    }
    if (!token) throw new AppError(401,'Access denied. Invalid Token')
    
    const decodedToken = jwt.verify(token, SECRET);
    (req as CustomRequest).token = decodedToken 

    next();
  } else throw new AppError(401,'Access denied. Invalid Token')
};
