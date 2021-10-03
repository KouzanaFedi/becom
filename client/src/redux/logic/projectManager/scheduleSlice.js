import { createSlice } from "@reduxjs/toolkit";

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState: {
        holidays: [],
        events: [],
        eventToCreate: {
            date: null
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
                state: ''
            },
            notes: []
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
                const { id, projectId, start, end, cible, name, token } = links[link];
                state.sharedLinks.push({ id, projectId, start, end, cible, name, token });
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
            state.events = [];
            const events = action.payload.events;
            const colorPalette = { pending: '#8c8c8c', confirmed: 'green', denied: 'red' };
            for (const event in events) {
                const { title, start, id, projectId, startTime, state: eventState } = events[event];
                state.events.push({
                    title,
                    start,
                    backgroundColor: colorPalette[eventState],
                    borderColor: colorPalette[eventState],
                    extendedProps: {
                        id,
                        projectId,
                        startTime,
                        eventState,
                        notes: []
                    }
                });
            }
        },
        ADD_EVENT_TO_LIST: (state, action) =>
        {
            const { title, start, id, projectId, startTime, state: eventState } = action.payload.event;
            state.events.push({
                title,
                start,
                backgroundColor: '#8c8c8c',
                borderColor: '#8c8c8c',
                extendedProps: {
                    id,
                    projectId,
                    startTime,
                    eventState,
                    notes: []
                }
            })
        },
        SET_CREATED_DATE: (state, action) =>
        {
            const { date } = action.payload;
            state.eventToCreate.date = date;
        },
        // SET_EVENT_TITLE: (state, action) =>
        // {
        //     const { title } = action.payload;
        //     state.eventToCreate.title.value = title.toString();
        //     if (state.eventToCreate.title.value.length < 4) {
        //         if (state.eventToCreate.title.value.length === 0)
        //             state.eventToCreate.title.error = "Obligatory field";
        //         else state.eventToCreate.title.error = "Minimum 4 characters";
        //     } else state.eventToCreate.title.error = null;
        //     state.eventToCreate.title.ready =
        //         state.eventToCreate.title.value.length > 0 && state.eventToCreate.title.error === null;
        // },
        RESET_CREATED_EVENT: (state, _) =>
        {
            state.eventToCreate.date = null;
            // state.eventToCreate.day = null;
            // state.eventToCreate.time = null;
            // state.eventToCreate.title = {
            //     value: "",
            //     error: null,
            //     ready: false
            // }
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

            const index = state.events.findIndex((event) => event.extendedProps.id === id);
            state.selectedEvent.updated.state = state.events[index].extendedProps.eventState;
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
                time: null,
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
        },
        INIT_SELECTED_EVENT_NOTES: (state, action) =>
        {
            state.selectedEvent.notes = [];
            const { notes } = action.payload;
            state.selectedEvent.notes = notes;
        },
        PUSH_NEW_NOTE_SELECTED_EVENT: (state, action) =>
        {
            const { note } = action.payload;
            state.selectedEvent.notes.push(note);
        },
        UPDATE_EVENT_STATUS: (state, action) =>
        {
            const { id, newState } = action.payload;
            state.selectedEvent.updated.state = newState;

            const index = state.events.findIndex((event) => event.extendedProps.id === id);
            state.events[index].extendedProps.eventState = newState;
            state.events[index].backgroundColor = '#8c8c8c';
            state.events[index].borderColor = '#8c8c8c';
        },
        DELETE_SHARED_LINK_CIBLE: (state, action) =>
        {
            const { cibleId, sharedLinkId } = action.payload;
            const sIndex = state.sharedLinks.é((shared) => shared.id === sharedLinkId);
            const cIndex = state.sharedLinks[sIndex].cible.findIndex((cible) => cible.id === cibleId);

            const newList = [
                ...state.sharedLinks[sIndex].cible.slice(0, cIndex),
                ...state.sharedLinks[sIndex].cible.slice(cIndex + 1),
            ];
            const tmp = state.sharedLinks[sIndex];
            const final = { ...tmp, cible: newList };
            state.sharedLinks[sIndex] = final;
            state.calendarForm.edited = final;
        },
        DELETE_SCHEDULE_LINK: (state, action) =>
        {
            const { id } = action.payload;
            const index = state.sharedLinks.findIndex((shared) => shared.id === id);
            state.sharedLinks.splice(index, 1);
            state.displayCalendarForm = null;
        }
    }
});

export const { SET_HOLIDAYS, SET_EVENTS, SET_CREATED_DATE, SET_EVENT_TITLE, RESET_CREATED_EVENT, INIT_SELECTED_EVENT, RESET_SELECTED_EVENT, UPDATE_SELECTED_TITLE, UPDATE_SELECTED_DATE, RESET_UPDATED_EVENT, CHECK_IF_DID_UPDATE, UPDATE_EVENT_STATE, DELETE_EVENT_STATE, INIT_SHARED_LINKS, SET_DISPLAY_CALENDAR_FORM, INIT_SELECTED_EVENT_NOTES, PUSH_NEW_NOTE_SELECTED_EVENT, UPDATE_EVENT_STATUS, DELETE_SHARED_LINK_CIBLE, DELETE_SCHEDULE_LINK, ADD_EVENT_TO_LIST } = scheduleSlice.actions;

export const scheduleHolidays = (state) => state.schedule.holidays;
export const scheduleEvents = (state) => state.schedule.events;
export const scheduleEventToCreate = (state) => state.schedule.eventToCreate;
export const scheduleSelectedEvent = (state) => state.schedule.selectedEvent.updated;
export const scheduleSelectedEventNotes = (state) => state.schedule.selectedEvent.notes;
export const scheduleSharedLinks = (state) => state.schedule.sharedLinks;
export const scheduleDisplayCalendarForm = (state) => state.schedule.displayCalendarForm;
export const scheduleCalendarForm = (state) => state.schedule.calendarForm;

export default scheduleSlice.reducer;