import { Schema, model, Types } from 'mongoose';

const TagSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    }
});

export const Tag = model('tag', TagSchema);