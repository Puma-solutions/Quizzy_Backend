import { SubjectModel, Subject} from "../models/subject.model";
import { BaseDao } from "./base.dao";

export class SubjectDao extends BaseDao<Subject>{
    constructor(){
        super(SubjectModel)
    }
    getAllPopulate(): Promise<Subject[] | undefined> {
        const subject = this.collection.find().populate('exams.idExam')
        return subject
    }
    getByIdPopulate(id: string): Promise<Subject | null> {
        const subject = this.collection.findById(id).populate('exams.idExam')
        return subject
    }
}