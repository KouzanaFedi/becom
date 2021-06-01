import { createSlice } from "@reduxjs/toolkit";

const sharedScheduleSlice = createSlice({
    name: 'sharedSchedule',
    initialState: {
        sharedEvents: [],
        token: {
            value: "",
            valid: false,
        },
    },
    reducers: {
        INIT_SHARED_EVENTS: (state, action) =>
        {
            state.sharedEvents = [];
            const { events } = action.payload;
            for (const event in events) {
                const { id, title, start, startTime, end, projectId, state: eventState } = events[event];
                state.sharedEvents.push({
                    id,
                    title,
                    start,
                    startTime,
                    end,
                    projectId,
                    state: eventState,
                    notes: []
                });
            }
        },
        SET_TOKEN_VALUE: (state, action) =>
        {
            state.token.value = action.payload.token;
        },
        SET_TOKEN_VALID: (state, action) =>
        {
            state.token.valid = action.payload.valid;
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
            const eventIndex = state.sharedEvents.findIndex((event) => event.id === id);
            const event = state.sharedEvents[eventIndex];
            event.notes.push(note);
        },
        DELETE_EVENT_FROM_LIST: (state, action) =>
        {
            const { id } = action.payload;
            const eventIndex = state.sharedEvents.findIndex((event) => event.id === id);
            state.sharedEvents.splice(eventIndex, 1);
        }
    },
});

export const { INIT_SHARED_EVENTS, SET_TOKEN_VALUE, SET_TOKEN_VALID, INIT_EVENT_NOTES, PUSH_NEW_NOTE, DELETE_EVENT_FROM_LIST } = sharedScheduleSlice.actions;

export const sharedScheduleSharedEvents = (state) => state.sharedSchedule.sharedEvents;
export const sharedScheduleToken = (state) => state.sharedSchedule.token;

export default sharedScheduleSlice.reducer;
