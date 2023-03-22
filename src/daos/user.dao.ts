import { modelUser,User } from "../models/user.model";
import { BaseDao } from "./base.dao";

export class UserDao extends BaseDao<User>{
    constructor(){
        super(modelUser)
    }
}