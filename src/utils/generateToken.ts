import jwt , {Secret} from "jsonwebtoken";
import { User } from "../models/user.model";
import { SECRET } from "./config";

const clave_jwt: Secret = SECRET

export function generateToken(user: User) {
    const token = jwt.sign(
        { 
            email: user.email,
            idUser: user.id 
        }, 
        clave_jwt, 
        { 
            expiresIn: 60 * 60
        }
    );
    return token;
}
