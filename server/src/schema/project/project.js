import { Schema, model, Types } from 'mongoose';

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: Types.ObjectId,
        required: true,
        ref: 'users'
    }
});

export const Project = model('project', ProjectSchema);