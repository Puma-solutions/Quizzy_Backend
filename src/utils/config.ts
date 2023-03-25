import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8080;
export const MONGOURL = process.env.MONGOURL || ''
export const SECRET = process.env.SECRET || 'palabraMuySecreta'

