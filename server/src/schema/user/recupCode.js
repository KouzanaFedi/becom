import { Schema, model } from 'mongoose';

const RecupCodeSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
},
    { timestamps: { createdAt: 'created_at' } });

export const RecupCode = model('recupCodes', RecupCodeSchema);