import mongoose, { Schema, Document } from 'mongoose';

export interface INotes extends Document {
  course: string;
  professeur: string;
  student: string;

  // classes: mongoose.Types.ObjectId[];
}

const NotesSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cours: [
    {
      type: String,
      required: true,
    },
  ],
  classes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: false,
    },
  ],
});
export default mongoose.model<INotes>('Level', NotesSchema);
