import { Schema, model } from 'mongoose';

const HolidaysSchema = new Schema({
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
    },
    title: {
        type: String,
        required: true
    }
});

export const Holidays = model('holidays', HolidaysSchema);