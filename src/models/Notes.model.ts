import mongoose, { Schema, Document } from 'mongoose';

export interface INotes extends Document {
  course: mongoose.Types.ObjectId;
  professeur: mongoose.Types.ObjectId;
  student: mongoose.Types.ObjectId;
  classe: mongoose.Types.ObjectId;
  note1?: number;
  note2?: number;
}

const NotesSchema: Schema = new Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Course',
  },
  classe: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Class',
  },
  professeur: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  note1: {
    type: Number,
    required: false,
  },
  note2: {
    type: Number,
    required: false,
  },
});
export default mongoose.model<INotes>('Note', NotesSchema);
