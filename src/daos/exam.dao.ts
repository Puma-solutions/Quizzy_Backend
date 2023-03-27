import { ExamModel, Exam} from "../models/exam.model";
import { BaseDao } from "./base.dao";

export class ExamDao extends BaseDao<Exam>{
    constructor(){
        super(ExamModel)
    }
    async getExamsBySubjectID(idSubject:string){
        const exams = this.collection.find({idSubject:idSubject})
        return exams
    }
}