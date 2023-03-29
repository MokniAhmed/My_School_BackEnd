import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  name: string;
  professeursId: string;
  color: string;
}

const CourseSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  professeursId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'User',
  },
  color: {
    type: String,
    default: '#9660EB',
  },
});

export default mongoose.model<ICourse>('Course', CourseSchema);
