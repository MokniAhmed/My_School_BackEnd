import mongoose, { Schema, Document } from 'mongoose';

export interface ISchedule extends Document {
  coursesIds: mongoose.Types.ObjectId[];
}

const ScheduleSchema: Schema = new Schema({
  coursesIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: false,
    },
  ],
});

export default mongoose.model<ISchedule>('Schedule', ScheduleSchema);
