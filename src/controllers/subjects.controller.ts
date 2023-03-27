import { NextFunction, Request, Response } from "express";
import { SubjectServices } from "../services/subjects.services";

export class SubjectController{
    static async getAll(req:Request,res:Response,next:NextFunction){
        try{
            const subjects = await SubjectServices.getAll()
            res.json(subjects)
        }
        catch(err){
            next(err)
        }
    }
    static async getByID(req:Request,res:Response,next:NextFunction){
        try{
            const subject = await SubjectServices.getByIdDto(req.params.idSubject)
            res.json(subject)
        }
        catch(err){
            next(err)
        }
    }
    static async create(req:Request,res:Response,next:NextFunction){
        try{
            const idSubject = await SubjectServices.create(req.body)
            res.json({idSubject:idSubject})
        }
        catch(err){
            next(err)
        }
    }

}