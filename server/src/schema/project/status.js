import { Schema, model, Types } from 'mongoose';

const StatusSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['todo', 'doing', 'done', 'abondoned'],
        default: 'todo',
        required: true
    },
}, { timestamps: true });

export const Status = model('status', StatusSchema);