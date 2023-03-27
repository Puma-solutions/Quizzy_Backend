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
    async getExamByIdPopulate(idExam:string){
        const exam = this.collection.findById(idExam).populate('idSubject','name')
        return exam
    }
}