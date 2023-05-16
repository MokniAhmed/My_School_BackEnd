import mongoose, { Schema, Document } from 'mongoose';
import { Role, roles } from './user.model';

export interface IPreleve extends Document {
  firstName: string;
  lastName: string;
  emailPer: string;
  telephone: string;
  birthday: Date;
  gender: string;
  address: string;
  password: string;
  role: Role;
  image?: string;
  fatherFullName: string;
  motherFullName: string;
  fatherJob: string;
  motherJob: string;
}

const PreleveSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailPer: { type: String, required: true },
  telephone: { type: String, required: true },
  birthday: { type: Date, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  images: { type: String, default: null },
  role: {
    type: String,
    default: Role.STUDENT,
  },
  fatherFullName: { type: String, default: null },
  motherFullName: { type: String, default: null },
  fatherJob: { type: String, default: null },
  motherJob: { type: String, default: null },
});
export default mongoose.model<IPreleve>('Preleve', PreleveSchema);
