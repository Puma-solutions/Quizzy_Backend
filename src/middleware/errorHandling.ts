import { Request,Response,NextFunction } from "express"
import { AppError } from "../utils/AppError"

import { logger } from "../utils/logger"

export const errorHandling = (error:Error,req:Request,res:Response,next:NextFunction) => {
    res.header("Content-Type", 'application/json')
    if(error instanceof AppError){
        res.status(error.status).json({error:error.message})    
    }else{
        logger.error(`${req.method} url:: ${req.url} --- [ERROR]: ${error.message}`)
        res.status(500).json({error:error.message})
    }
}
