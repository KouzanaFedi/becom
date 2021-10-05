import { createSlice } from "@reduxjs/toolkit";
import { fullCalendarDateFormat } from "../../../utils/timeParser";

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState: {
        holidays: [],
        events: [],
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
                const { title, start, end, _id, description, image, state: eventState } = events[event];
                state.events.push({
                    title,
                    start: fullCalendarDateFormat(start),
                    backgroundColor: colorPalette[eventState],
                    borderColor: colorPalette[eventState],
                    extendedProps: {
                        end: fullCalendarDateFormat(end),
                        id: _id,
                        description,
                        image,
                        eventState,
                        notes: []
                    }
                });
            }
        },
        ADD_EVENT_TO_LIST: (state, action) =>
        {
            const { title, start, _id, projectId, end, state: eventState, image, description } = action.payload.event;
            state.events.push({
                title,
                start,
                backgroundColor: '#8c8c8c',
                borderColor: '#8c8c8c',
                extendedProps: {
                    id: _id,
                    projectId,
                    end,
                    description,
                    eventState,
                    image,
                    notes: []
                }
            })
        },
        DELETE_IMAGE_FROM_EVENT_UPDATE: (state, action) =>
        {
            const { id } = action.payload;
            const index = state.events.findIndex((event) => event.extendedProps.id === id);
            state.events[index].extendedProps.image = null;
        },
        ADD_IMAGE_FROM_EVENT_UPDATE: (state, action) =>
        {
            const { id, image } = action.payload;
            const index = state.events.findIndex((event) => event.extendedProps.id === id);
            state.events[index].extendedProps.image = image;
        },
        UPDATE_EVENT_STATE: (state, action) =>
        {
            const { event: { _id, title, start, description, end } } = action.payload;
            const index = state.events.findIndex(({ extendedProps }) => extendedProps.id === _id);
            const event = { ...state.events[index], extendedProps: { ...state.events[index].extendedProps } };
            event.title = title;
            event.start = start;
            event.backgroundColor = "#8c8c8c";
            event.borderColor = "#8c8c8c";
            event.extendedProps.eventState = "pending";
            event.extendedProps.end = end;
            event.extendedProps.description = description;
            state.events[index] = event;
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
            const { notes, id } = action.payload;
            const index = state.events.findIndex((event) => event.extendedProps.id === id);
            state.events[index].extendedProps.notes = notes;
        },
        PUSH_NEW_NOTE_SELECTED_EVENT: (state, action) =>
        {
            const { note, id } = action.payload;
            const index = state.events.findIndex((event) => event.extendedProps.id === id);
            state.events[index].extendedProps.notes.push(note);
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

export const { SET_HOLIDAYS, SET_EVENTS, INIT_SELECTED_EVENT, UPDATE_EVENT_STATE, DELETE_EVENT_STATE, INIT_SHARED_LINKS, SET_DISPLAY_CALENDAR_FORM, INIT_SELECTED_EVENT_NOTES, PUSH_NEW_NOTE_SELECTED_EVENT, UPDATE_EVENT_STATUS, DELETE_SHARED_LINK_CIBLE, ADD_IMAGE_FROM_EVENT_UPDATE, DELETE_SCHEDULE_LINK, ADD_EVENT_TO_LIST, DELETE_IMAGE_FROM_EVENT_UPDATE } = scheduleSlice.actions;

export const scheduleHolidays = (state) => state.schedule.holidays;
export const scheduleEvents = (state) => state.schedule.events;
export const scheduleSharedLinks = (state) => state.schedule.sharedLinks;
export const scheduleDisplayCalendarForm = (state) => state.schedule.displayCalendarForm;
export const scheduleCalendarForm = (state) => state.schedule.calendarForm;

export default scheduleSlice.reducer;