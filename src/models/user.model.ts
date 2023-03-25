import mongoose, { Schema, Document } from 'mongoose';

export interface User {
  id?:string,
  name: string;
  email: string;
  password: string;
  thumbnail?: string;
}

const userSchema: Schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  thumbnail: {type: String}
});

export const userModel = mongoose.model<User>('user', userSchema);