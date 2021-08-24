import { Schema, model, Types } from 'mongoose';

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    client: {
        type: Types.ObjectId,
        required: true,
        ref: 'users'
    },
    services: [{ type: Types.ObjectId, ref: 'service' }],
    statusOptions: [{ type: Types.ObjectId, ref: 'status' }]
}, { timestamps: true });

export const Project = model('project', ProjectSchema);