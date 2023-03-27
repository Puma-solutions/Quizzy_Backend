import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface Question{
  id?:ObjectId,
  question: string,
  answer: string
}

export interface Exam {
  id?:ObjectId,
  name: string;
  questions?: Question[],
  idSubject: ObjectId
}

const ExamSchema: Schema = new Schema<Exam>({
  name: { type: String, required: true },
  questions:[{
    question:{type:String,require:true},
    answer: {type:String,require:true}
  }],
  idSubject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subjects",
  }
});

export const ExamModel = mongoose.model<Exam>('exams', ExamSchema);