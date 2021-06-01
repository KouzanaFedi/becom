import { Schema, model } from 'mongoose';

const TaskTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
});

export const TaskType = model('taskType', TaskTypeSchema);
