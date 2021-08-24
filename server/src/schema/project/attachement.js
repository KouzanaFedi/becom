import { Schema, model, Types } from 'mongoose';

const AttachementSchema = new Schema({
    src: {
        type: String,
        required: true,
    },
    addedBy: {
        type: Types.ObjectId,
        required: true,
        ref: 'users'
    },
    size: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

export const Attachement = model('attachement', AttachementSchema);