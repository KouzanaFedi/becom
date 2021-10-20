import { createSlice } from "@reduxjs/toolkit";
import { fullCalendarDateFormat } from "../../../utils/timeParser";

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState: {
        holidays: [],
        events: [],
        sharedLinks: [],
        calendarForm: {}
    },
    reducers: {
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
                const { title, start, end, _id, description, image, state: eventState, annotations } = events[event];
                state.events.push({
                    title,
                    start: fullCalendarDateFormat(start),
                    backgroundColor: colorPalette[eventState],
                    borderColor: colorPalette[eventState],
                    extendedProps: {
                        end: fullCalendarDateFormat(end),
                        id: _id,
                        description,
                        annotations,
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
                    notes: [],
                    annotations: []
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
        INIT_SHARED_LINKS: (state, action) =>
        {
            const links = action.payload.sharedLink;
            state.sharedLinks = links;
        },
        ADD_SHARED_LINK: (state, action) =>
        {
            const { shared } = action.payload;
            state.sharedLinks.push(shared);
        },
        ADD_SHARED_LINK_CIBLE: (state, action) =>
        {
            const { cible, sharedLinkId } = action.payload;
            const sIndex = state.sharedLinks.findIndex((shared) => shared._id === sharedLinkId);
            state.sharedLinks[sIndex].cible.push(cible)
        },
        DELETE_SHARED_LINK_CIBLE: (state, action) =>
        {
            const { cibleId, sharedLinkId } = action.payload;
            const sIndex = state.sharedLinks.findIndex((shared) => shared._id === sharedLinkId);
            const cIndex = state.sharedLinks[sIndex].cible.findIndex((cible) => cible._id === cibleId);

            state.sharedLinks[sIndex].cible.splice(cIndex, 1);
        },
        DELETE_SCHEDULE_LINK: (state, action) =>
        {
            const { id } = action.payload;
            const index = state.sharedLinks.findIndex((shared) => shared._id === id);
            state.sharedLinks.splice(index, 1);
        }
    }
});

export const { SET_HOLIDAYS, SET_EVENTS, INIT_SELECTED_EVENT, UPDATE_EVENT_STATE, DELETE_EVENT_STATE, INIT_SHARED_LINKS, INIT_SELECTED_EVENT_NOTES, PUSH_NEW_NOTE_SELECTED_EVENT, UPDATE_EVENT_STATUS, DELETE_SHARED_LINK_CIBLE, ADD_IMAGE_FROM_EVENT_UPDATE, DELETE_SCHEDULE_LINK, ADD_EVENT_TO_LIST, DELETE_IMAGE_FROM_EVENT_UPDATE, ADD_SHARED_LINK, ADD_SHARED_LINK_CIBLE } = scheduleSlice.actions;

export const scheduleHolidays = (state) => state.schedule.holidays;
export const scheduleEvents = (state) => state.schedule.events;
export const scheduleSharedLinks = (state) => state.schedule.sharedLinks;

export default scheduleSlice.reducer;