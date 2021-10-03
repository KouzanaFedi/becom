import { Schema, model, Types } from 'mongoose';

const NotesSchema = new Schema({
    message: {
        type: String,
        required: true,
        trim: true
    },
    senderType: {
        type: String,
        enum: ['client', 'agence'],
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    recieverType: {
        type: String,
        enum: ['client', 'agence'],
        required: true
    },
    reciever: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
export const Note = model('note', NotesSchema);

const EventSchema = new Schema({
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
    },
    description: {
        type: String,
        required: true
    },
    projectId: {
        type: Types.ObjectId,
        required: true
    },
    state: {
        type: String,
        enum: ['pending', 'confirmed', 'denied'],
        default: 'pending'
    },
    image: {
        type: Types.ObjectId,
        ref: 'attachement',
        default: null
    },
    notes: [NotesSchema]
});

export const Event = model('event', EventSchema);