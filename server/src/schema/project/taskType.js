import { Schema, model, Types } from 'mongoose';

const TaskTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

export const TaskType = model('taskType', TaskTypeSchema);
