import { Schema, model, Types } from 'mongoose';

const ProjectNoteSchema = new Schema({
    sender: {
        type: Types.ObjectId,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export const ProjectNote = model('projectNote', ProjectNoteSchema);