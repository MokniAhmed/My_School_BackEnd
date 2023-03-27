import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  name: string;
  professeursId: string;
}

const CourseSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  professeursId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  }
});

export default mongoose.model<ICourse>('Course', CourseSchema);