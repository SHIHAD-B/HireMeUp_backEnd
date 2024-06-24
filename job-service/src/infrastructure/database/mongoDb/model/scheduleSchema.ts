import mongoose, { Schema } from 'mongoose';
import { ISchedule } from '../../../../domain/entities/schedule.entity';

const ScheduleSchema: Schema = new Schema({

        userId: { type: mongoose.Types.ObjectId },
        companyId: { type: mongoose.Types.ObjectId },
        jobId: { type: mongoose.Types.ObjectId },
        date: { type: Date },
        status: { type: String, enum: ['re-scheduled','next-round', 'completed', 'upcomming', 'cancelled'], default: "upcomming" },
        title: { type: String },
        interviewer: { type: String },
        createdAt: { type: Date, default: Date.now() },
        editedAt: { type: Date }


});

const Schedule = mongoose.model<ISchedule>('Schedule', ScheduleSchema);

export default Schedule;

