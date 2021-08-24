import { Schema, model, Types } from 'mongoose';

const ServiceSchema = new Schema({
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
    notes: [{ type: Types.ObjectId, ref: 'projectNote' }],
    tasks: [{ type: Types.ObjectId, ref: 'task' }]
}, { timestamps: true });

export const Service = model('service', ServiceSchema);