import { SubjectDao } from "../daos/subjects.dao";
const subjectDao = new SubjectDao();

import { asDtoSubjectsList , asDtoSubject } from "../dto/subjects.dto";
import { AppError } from "../utils/AppError";
import { Subject } from "../models/subject.model";

export class SubjectServices {
    static async getAll(){
        const subjects = await subjectDao.getAllPopulate()
        if(subjects) return asDtoSubjectsList(subjects)
        else return []

    }
    static async getByIdDto(idSubject:string){
        const subject = await subjectDao.getByIdPopulate(idSubject)
        if(!subject) throw new AppError(404,'Subject not found')
        return asDtoSubject(subject)
    }
    static async getByID(idSubject:string){
        const subject = await subjectDao.getById(idSubject)
        if(!subject) throw new AppError(404,'Subject not found')
        return subject
    }
    static async save(subject: Subject){
        const subjectSaved = await subjectDao.save(subject)
        return subjectSaved
    }
    static async create(body:any){
        if(!body || !body.name) throw new AppError(400,'You must send all the fields (name)')
        const subject : Subject = {
            name: body.name
        }
        const data = await subjectDao.save(subject)
        return data?.id
    }
}