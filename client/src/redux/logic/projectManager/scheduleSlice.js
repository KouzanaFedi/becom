import { createSlice } from "@reduxjs/toolkit";

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState: {
        holidays: [],
        events: [],
        eventToCreate: {
            day: null,
            time: null,
            title: {
                value: "",
                error: null,
                ready: false
            }
        },
        selectedEvent: {
            original: {
                id: null,
                title: "",
                day: null,
                time: null
            },
            updated: {
                id: null,
                title: {
                    value: "",
                    error: null,
                    ready: false
                },
                day: null,
                time: null,
                didUpdate: false,
            },
        },
        sharedLinks: [],
        displayCalendarForm: null,
        calendarForm: {}
    },
    reducers: {
        INIT_SHARED_LINKS: (state, action) =>
        {
            const links = action.payload.sharedLink;
            state.sharedLinks = [];
            for (const link in links) {
                const { id, projectId, start, end, cible, name } = links[link];
                state.sharedLinks.push({ id, projectId, start, end, cible, name });
            }
        },
        SET_HOLIDAYS: (state, action) =>
        {
            const holidays = action.payload.holidays;
            state.holidays = [];
            for (const day in holidays) {
                const { title, start } = holidays[day];
                state.holidays.push({ title, start, display: 'background' });
            }
        },
        SET_EVENTS: (state, action) =>
        {
            const events = action.payload.events;
            state.events = [];
            for (const event in events) {
                const { title, start, id, projectId, startTime } = events[event];
                state.events.push({ title, start, extendedProps: { id, projectId, startTime } });
            }
        },
        SET_CREATED_DATE: (state, action) =>
        {
            const { day, time } = action.payload;
            if (day !== undefined) {
                state.eventToCreate.day = day;
            }
            if (time !== undefined) {
                state.eventToCreate.time = time;
            }
        },
        SET_EVENT_TITLE: (state, action) =>
        {
            const { title } = action.payload;
            state.eventToCreate.title.value = title.toString();
            if (state.eventToCreate.title.value.length < 4) {
                if (state.eventToCreate.title.value.length === 0)
                    state.eventToCreate.title.error = "Obligatory field";
                else state.eventToCreate.title.error = "Minimum 4 characters";
            } else state.eventToCreate.title.error = null;
            state.eventToCreate.title.ready =
                state.eventToCreate.title.value.length > 0 && state.eventToCreate.title.error === null;
        },
        RESET_CREATED_EVENT: (state, _) =>
        {
            state.eventToCreate.day = null;
            state.eventToCreate.time = null;
            state.eventToCreate.title = {
                value: "",
                error: null,
                ready: false
            }
        },
        INIT_SELECTED_EVENT: (state, action) =>
        {
            const { id, title, day, time } = action.payload;
            state.selectedEvent.original = {
                id,
                title,
                day,
                time
            };
            state.selectedEvent.updated = {
                id,
                day,
                time,
                title: {
                    value: title,
                    error: null,
                    ready: true,
                }
            }
        },
        RESET_SELECTED_EVENT: (state, _) =>
        {
            state.selectedEvent.updated = {
                id: null,
                title: {
                    value: "",
                    error: null,
                    ready: false
                },
                day: null,
                time: null
            };
            state.selectedEvent.original = {
                id: null,
                title: "",
                day: null,
                time: null
            }
        },
        UPDATE_SELECTED_DATE: (state, action) =>
        {
            const { day, time } = action.payload;
            if (day !== undefined) {
                state.selectedEvent.updated.day = day;
            }
            if (time !== undefined) {
                state.selectedEvent.updated.time = time;
            }
            state.selectedEvent.updated.didUpdate =
                (state.selectedEvent.updated.title.value !== state.selectedEvent.original.title) ||
                (state.selectedEvent.updated.day !== state.selectedEvent.original.day) ||
                (state.selectedEvent.updated.time !== state.selectedEvent.original.time)
        },
        UPDATE_SELECTED_TITLE: (state, action) =>
        {
            const { title } = action.payload;
            state.selectedEvent.updated.title.value = title.toString();
            if (state.selectedEvent.updated.title.value.length < 4) {
                if (state.selectedEvent.updated.title.value.length === 0)
                    state.selectedEvent.updated.title.error = "Obligatory field";
                else state.selectedEvent.updated.title.error = "Minimum 4 characters";
            } else state.selectedEvent.updated.title.error = null;
            state.selectedEvent.updated.title.ready =
                state.selectedEvent.updated.title.value.length > 0 && state.selectedEvent.updated.title.error === null;

            state.selectedEvent.updated.didUpdate =
                (state.selectedEvent.updated.title.value !== state.selectedEvent.original.title) ||
                (state.selectedEvent.updated.day !== state.selectedEvent.original.day) ||
                (state.selectedEvent.updated.time !== state.selectedEvent.original.time)
        },
        RESET_UPDATED_EVENT: (state, _) =>
        {
            const { id, title, day, time } = state.selectedEvent.original;
            state.selectedEvent.updated.didUpdate = false;
            state.selectedEvent.updated = {
                id,
                day,
                time,
                title: {
                    value: title,
                    error: null,
                    ready: false,
                }
            }
        },
        UPDATE_EVENT_STATE: (state, action) =>
        {
            const { id, title, start, startTime } = action.payload;
            const eventIndex = state.events.findIndex(({ extendedProps }) => extendedProps.id === id);
            const event = state.events[eventIndex];
            event.title = title;
            event.start = start;
            event.extendedProps.startTime = startTime;
        },
        DELETE_EVENT_STATE: (state, action) =>
        {
            const { id } = action.payload;
            const eventIndex = state.events.findIndex(({ extendedProps }) => extendedProps.id === id);
            state.events.splice(eventIndex, 1);
        },
        SET_DISPLAY_CALENDAR_FORM: (state, action) =>
        {
            const { type, data } = action.payload;

            state.displayCalendarForm = type;

            if (type != null) {
                // const { id, projectId, start, end, cible, name } = links[link];
                if (type === 'edit') {
                    state.calendarForm.original = data;
                    state.calendarForm.edited = data;
                } else {
                    state.calendarForm.edited = {
                        id: "",
                        projectId: "",
                        start: "",
                        end: "",
                        cible: [],
                        name: ""
                    }
                }
            } else {
                state.calendarForm = {}
            }
        }
    }
});

export const { SET_HOLIDAYS, SET_EVENTS, SET_CREATED_DATE, SET_EVENT_TITLE, RESET_CREATED_EVENT, INIT_SELECTED_EVENT, RESET_SELECTED_EVENT, UPDATE_SELECTED_TITLE, UPDATE_SELECTED_DATE, RESET_UPDATED_EVENT, CHECK_IF_DID_UPDATE, UPDATE_EVENT_STATE, DELETE_EVENT_STATE, INIT_SHARED_LINKS, SET_DISPLAY_CALENDAR_FORM } = scheduleSlice.actions;

export const scheduleHolidays = (state) => state.schedule.holidays;
export const scheduleEvents = (state) => state.schedule.events;
export const scheduleEventToCreate = (state) => state.schedule.eventToCreate;
export const scheduleSelectedEvent = (state) => state.schedule.selectedEvent.updated;
export const scheduleSharedLinks = (state) => state.schedule.sharedLinks;
export const scheduleDisplayCalendarForm = (state) => state.schedule.displayCalendarForm;
export const scheduleCalendarForm = (state) => state.schedule.calendarForm;

export default scheduleSlice.reducer;