import { Exam, Question } from "../models/exam.model";
import { AppError } from "../utils/AppError";
import { ExamDao } from "../daos/exam.dao";
const examDao = new ExamDao();

import { SubjectServices } from "./subjects.services";

export class ExamServices{
    static async getExamById(idExam:string){
        if(!idExam) throw new AppError(400,'You must specify idExam as a parameter')
        const data = await examDao.getExamByIdPopulate(idExam)
        if(!data) throw new AppError(400,'Exam not found')
        return data
    }
    static async createExam(body:any){
        if(!body || !body.name || !body.idSubject) throw new AppError(400,'You must send all the fields (name, id_subject)')
        const subject = await SubjectServices.getByID(body.idSubject)
        if(!subject) throw new AppError(400,'Subject not found')
        const exam : Exam = {
            name: body.name,
            idSubject: body.idSubject
        }
        const data = await examDao.save(exam)
        if(data?.id && subject.exams) subject.exams.push({idExam:data.id})
        await SubjectServices.save(subject)
        return data?.id
    }
    static async createQuesiton(idExam: string, body:any){
        if(!idExam) throw new AppError(400,'You must specify idExam as a parameter')
        if(!body || !body.question || !body.answer) throw new AppError(400,'You must send all the fields (question, answer)')
        const exam = await examDao.getById(idExam)
        if(!exam) throw new AppError(400,'Exam not found')
        const question: Question = {
            question: body.question,
            answer: body.answer
        }
        exam.questions?.push(question)
        const data = await examDao.save(exam)
    }
    static async updateQuestion(idExam:string,idQuestion:string,body:any){
        if(!idExam || !idQuestion) throw new AppError(400,'You must specify idExam and idQuesiton as parameters')
        if(!body || (!body.question && !body.answer)) throw new AppError(400,'You must send the fields you want to modify (question or answer)')
        const exam = await examDao.getById(idExam)
        if(!exam) throw new AppError(400,'Exam not found')
        const questionIndex = exam.questions?.findIndex((element) => element.id?.toString() == idQuestion)
        if(questionIndex == -1) throw new AppError(400,'Question not found')
        if(body.question && questionIndex && exam.questions) exam.questions[questionIndex].question = body.question
        if(body.answer && questionIndex && exam.questions) exam.questions[questionIndex].answer = body.answer
        const data = await examDao.save(exam)
    }
    static async deleteQuestion(idExam:string,idQuestion:string){
        if(!idExam || !idQuestion) throw new AppError(400,'You must specify idExam and idQuesiton as parameters')
        const exam = await examDao.getById(idExam)
        if(!exam) throw new AppError(400,'Exam not found')
        const questionIndex = exam.questions?.findIndex((element) => element.id?.toString() == idQuestion)
        if(questionIndex == -1) throw new AppError(400,'Question not found')
        if(questionIndex != undefined && exam.questions) exam.questions.splice(questionIndex,1)
        const data = await examDao.save(exam)
    }
}