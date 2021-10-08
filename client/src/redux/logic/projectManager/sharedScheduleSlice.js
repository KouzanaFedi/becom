import { createSlice } from "@reduxjs/toolkit";

const sharedScheduleSlice = createSlice({
    name: 'sharedSchedule',
    initialState: {
        sharedEvents: [],
        users: {
            cible: [],
            selected: null
        },
        token: null,
        schedule: null
    },
    reducers: {
        INIT_SHARED_EVENTS: (state, action) =>
        {
            const { getSharedSchedule, token } = action.payload;
            state.sharedEvents = getSharedSchedule.events;
            state.users = {
                cible: getSharedSchedule.cible,
                selected: getSharedSchedule.selectedCible,
            };
            state.schedule = {
                _id: getSharedSchedule._id,
                name: getSharedSchedule.name,
                start: getSharedSchedule.start,
                end: getSharedSchedule.end,
                projectId: getSharedSchedule.projectId
            };
            state.token = token;
        },
        INIT_EVENT_NOTES: (state, action) =>
        {
            const { notes, id } = action.payload;
            const eventIndex = state.sharedEvents.findIndex((event) => event.id === id);
            const event = state.sharedEvents[eventIndex];
            event.notes = notes;
        },
        PUSH_NEW_NOTE: (state, action) =>
        {
            const { note, id } = action.payload;
            const eventIndex = state.sharedEvents.findIndex((event) => event._id === id);
            const event = state.sharedEvents[eventIndex];
            event.notes.push(note);
        },
        DELETE_EVENT_FROM_LIST: (state, action) =>
        {
            const { id } = action.payload;
            const eventIndex = state.sharedEvents.findIndex((event) => event._id === id);
            state.sharedEvents.splice(eventIndex, 1);
        },
        ADD_ANNOTATION_TO_EVENT: (state, action) =>
        {
            const { id, annotation } = action.payload;
            const eventIndex = state.sharedEvents.findIndex((event) => event._id === id);
            state.sharedEvents[eventIndex].annotations.push(annotation);
        },
        DELETE_ANNOTATION_FROM_EVENT: (state, action) =>
        {
            const { id, idEvent } = action.payload;
            const eventIndex = state.sharedEvents.findIndex((event) => event._id === idEvent);
            const annoIndex = state.sharedEvents[eventIndex].annotations.findIndex((anno) => anno._id === id);
            state.sharedEvents[eventIndex].annotations.splice(annoIndex, 1);
        }
    },
});

export const { INIT_SHARED_EVENTS, INIT_EVENT_NOTES, PUSH_NEW_NOTE, DELETE_EVENT_FROM_LIST, ADD_ANNOTATION_TO_EVENT, DELETE_ANNOTATION_FROM_EVENT } = sharedScheduleSlice.actions;

export const sharedScheduleSharedEvents = (state) => state.sharedSchedule.sharedEvents;
export const sharedScheduleUsers = (state) => state.sharedSchedule.users;
export const sharedScheduleData = (state) => state.sharedSchedule.schedule;
export const scheduleToken = (state) => state.sharedSchedule.token;

export default sharedScheduleSlice.reducer;
