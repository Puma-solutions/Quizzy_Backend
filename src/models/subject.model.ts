import mongoose, { Schema, ObjectId } from 'mongoose';

export interface Subject {
  id?:string
  name: string
  exams?:[
    {idExam: ObjectId}
  ]
}

const SubjectSchema: Schema = new Schema<Subject>({
  name: { type: String, required: true },
  exams:[{idExam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "exams",
  }}]
});

export const SubjectModel = mongoose.model<Subject>('subjects', SubjectSchema);