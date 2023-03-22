import { Request,Response,NextFunction } from "express"

import { logger } from "../utils/logger"

export const errorHandling = (error:Error,req:Request,res:Response,next:NextFunction) => {
    logger.error(`${req.method} url:: ${req.url} --- ${error.message}`)
    res.header("Content-Type", 'application/json')
    res.status(500).send({error:error.message})
}
