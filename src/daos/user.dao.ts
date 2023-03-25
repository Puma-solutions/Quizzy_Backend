import { userModel,User } from "../models/user.model";
import { BaseDao } from "./base.dao";

export class UserDao extends BaseDao<User>{
    constructor(){
        super(userModel)
    }
    async getUserByEmail(email:string){
        const user = await this.collection.findOne({email:email})
        return user
    }
}