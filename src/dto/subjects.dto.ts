import { Subject } from "../models/subject.model";

class DtoSubjectList {
  public id: string;
  public name: string;
  public countQuestions: number = 0;
  public countExams: number = 0;

  constructor(subject: any) {
    this.id = subject.id || '';
    this.name = subject.name
    this.countExams = subject.exams?.length || 0
    if(subject.exams != undefined) {
      this.countExams = subject.exams.length
      subject.exams.forEach((exam:any)=>{
        if(exam.idExam.questions != undefined) {
          this.countQuestions += exam.idExam.questions.length
        }
      })
    }
  }
}

interface ExamDto {
  id?:string,
  name:string,
  countQuestions: number,
  questions : Object[]
}

class DtoSubject {
  public id: string;
  public name: string;
  public exams: ExamDto[]

  constructor(subject: any) {
    this.id = subject.id || '';
    this.name = subject.name
    this.exams = []
    if(subject.exams != undefined) {
      subject.exams.forEach((exam:any)=>{
        if(exam.idExam.questions != undefined) {
          this.exams.push({
            id:exam.idExam.id,
            name: exam.idExam.name,
            countQuestions: exam.idExam.questions.length,
            questions: exam.idExam.questions
          })
        }
      })
    } 
  }
}

export function asDtoSubjectsList(subjects:Subject[]) {
  return subjects.map((p) => new DtoSubjectList(p));
}

export function asDtoSubject(subject:Subject) {
  return new DtoSubject(subject)
}
