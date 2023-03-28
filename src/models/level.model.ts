import mongoose, { Schema, Document } from 'mongoose';

export interface ILevel extends Document {
  name: string;
  cours: string[];
  classes: mongoose.Types.ObjectId[];
}

const LevelSchema: Schema = new Schema({
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
      required: true,
    },
  ],
});
export default mongoose.model<ILevel>('Level', LevelSchema);
