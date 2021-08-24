import { Schema, model, Types } from 'mongoose';

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    dueTime: {
        type: Date,
        required: false
    },
    tags: [{ type: Types.ObjectId, ref: 'tag' }],
    members: [{ type: Types.ObjectId, ref: 'users' }],
    attachement: [{ type: Types.ObjectId, ref: 'attachement' }],
    notes: [{ type: Types.ObjectId, ref: 'projectNote' }],
    coverImage: {
        type: String,
        required: false,
        default: null
    },
    status: {
        type: Types.ObjectId,
        required: true,
        default: null
    }
}, { timestamps: true });

export const Task = model('task', TaskSchema);