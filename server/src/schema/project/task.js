import { Schema, model, Types } from 'mongoose';

const TaskSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    typeId: {
        type: Types.ObjectId,
        required: true,
    },
    assignedToId: {
        type: Types.ObjectId,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: false
    },
    state: {
        type: String,
        enum: ['todo', 'doing', 'done', 'toreview'],
        default: 'todo'
    },
    descriptin: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        default: 0
    },
    projectId: {
        type: Types.ObjectId,
        required: true
    }
}, { timestamps: true });

export const Task = model('task', TaskSchema);