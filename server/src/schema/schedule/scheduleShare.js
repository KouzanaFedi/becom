import { Schema, model, Types } from 'mongoose';

const ScheduleShareSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    projectId: {
        type: Types.ObjectId,
        required: true,
        ref: 'project'
    },
    end: {
        type: Date,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: String,
    cible: [
        {
            email: {
                type: String,
                required: true
            },
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            }
        }
    ]
});

export const ScheduleShare = model('scheduleShare', ScheduleShareSchema);