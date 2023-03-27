import { NextFunction, Request, Response } from "express";
import { ExamServices } from "../services/exam.services";

export class ExamController{
    static async getExamById(req:Request,res:Response,next:NextFunction){
        try{
            const exam = await ExamServices.getExamById(req.params.idExam)
            res.json(exam)
        }
        catch(err){
            next(err)
        }
    }
    static async createExam(req:Request,res:Response,next:NextFunction){
        try{
            const idExam = await ExamServices.createExam(req.body)
            res.json({idExam:idExam})
        }
        catch(err){
            next(err)
        }
    }
    static async createQuestion(req:Request,res:Response,next:NextFunction){
        try{
            await ExamServices.createQuesiton(req.params.idExam,req.body)
            res.json({message:'Question created successfully'})
        }
        catch(err){
            next(err)
        }
    }
    static async updateQuestion(req:Request,res:Response,next:NextFunction){
        try{
            await ExamServices.updateQuestion(req.params.idExam,req.params.idQuestion,req.body)
            res.json({message:'Question updated successfully'})
        }
        catch(err){
            next(err)
        }
    }
    static async deleteQuestion(req:Request,res:Response,next:NextFunction){
        try{
            await ExamServices.deleteQuestion(req.params.idExam,req.params.idQuestion)
            res.json({message:'Question deleted successfully'})
        }
        catch(err){
            next(err)
        }
    }
}