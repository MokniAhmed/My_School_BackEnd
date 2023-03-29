import mongoose, { Schema, Document } from 'mongoose';

export interface IClass extends Document {
  name: string;
  studentsIds: mongoose.Types.ObjectId[];
  courses: mongoose.Types.ObjectId[];
  schedulesId: mongoose.Types.ObjectId;
}

const ClassSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  studentsIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: false,
    },
  ],
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: false,
    },
  ],
  schedulesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule',
    required: false,
  },
});

export default mongoose.model<IClass>('Class', ClassSchema);
