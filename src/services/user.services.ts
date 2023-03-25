import bCrypt from "bcrypt";

import { UserDao } from "../daos/user.dao";
const userDao = new UserDao();

import { User } from "../models/user.model";
import { AppError } from "../utils/AppError";

import { generateToken } from "../utils/generateToken";

function createHash(password:string) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10));
}

export class UserServices {
  static async register(body: any) {
    if (!body || !body.password || !body.email || !body.name)
      throw new AppError(
        400,
        "You must send all the fields (name, email, password)"
      );

    const isUserExists = await userDao.getUserByEmail(body.email);
    if (isUserExists)
      throw new AppError(400, "There is already a user with that email");

    const user: User = {
      name: body.name,
      password: createHash(body.password),
      email: body.email,
      thumbnail: body.thumbnail,
    };

    await userDao.save(user);
  }

  static async login(email:string, password:string) {
    const user = await userDao.getUserByEmail(email)
    if(user){
      const validPassword = await bCrypt.compare(password,user.password)
      if(validPassword) {
        const jwtUser = generateToken(user)
        return jwtUser
      }

      else new AppError(401,'Invalid email or password')
    }
    else new AppError(401,'Invalid email or password')
  }
}
