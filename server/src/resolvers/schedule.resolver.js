import { Event, Note } from "../schema/schedule/event";
import { ScheduleShare } from "../schema/schedule/scheduleShare";
import { Holidays } from "../schema/schedule/holidays"
import { fullCalendarDateFormat, fullCalendarTimeFormat, getScheduleSharingPayload, getScheduleSharingToken } from "../utils/util";
import { AuthenticationError } from "apollo-server-errors";
import { INVALIDE_SHARE_TOKEN_ERROR, SCHEDULE_INVALIDE_ERROR, EVENT_INVALIDE_ERROR, INVALIDE_INPUT_ERROR } from "../utils/errors/EventError";
import { PubSub, withFilter } from "graphql-subscriptions";
import { getFileUploadedSize, processUpload } from "../utils/fileUpload";
import { Attachement } from "../schema/project/attachement";

const pubsub = new PubSub();

export const scheduleResolver = {
    Query: {
        holidaysEvent: async (_, args) =>
        {
            const events = [];
            await Holidays.find({}, (_, holidays) =>
            {
                if (holidays != undefined) {
                    holidays.forEach((holi) =>
                    {
                        events.push({
                            title: holi.title,
                            start: fullCalendarDateFormat(holi.start),
                        });
                    });
                }
            });

            return events;
        },
        eventsByProjectId: async (_, args) =>
        {
            const projectId = args.projectId;
            const events = [];
            await Event.find({ projectId }, (_, eventsData) =>
            {
                if (eventsData != undefined) {
                    eventsData.forEach((event) =>
                    {
                        const data = {
                            id: event._id,
                            title: event.title,
                            start: fullCalendarDateFormat(event.start),
                            startTime: fullCalendarTimeFormat(event.start),
                            projectId: event.projectId,
                            state: event.state
                        }
                        if (event.end != undefined) {
                            data['end'] = fullCalendarDateFormat(event.end);
                        }
                        events.push(data);
                    });
                }
            });
            return events;
        },
        eventNotes: async (_, args) =>
        {
            const { id } = args;
            const notes = [];
            const event = await Event.findById(id);
            if (event == null) {
                throw new AuthenticationError(EVENT_INVALIDE_ERROR.toString())
            }
            event.notes.forEach((note) =>
            {
                const { _id, message, senderType, sender, recieverType, reciever, createdAt } = note;
                notes.push({
                    id: _id,
                    message,
                    senderType,
                    sender,
                    recieverType,
                    reciever,
                    createdAt
                });
            });
            notes.sort((a, b) => a.createdAt - b.createdAt);
            return notes;
        },
        getSharedSchedulesByProjecId: async (_, args) =>
        {
            const { projectId } = args;
            const sharedSchedules = [];

            await ScheduleShare.find({ projectId }, (err, shared) =>
            {
                if (err) {
                    throw new AuthenticationError(INVALIDE_INPUT_ERROR.toString());
                }
                if (shared != undefined) {
                    shared.forEach((share) =>
                    {
                        const response = {
                            id: share._id,
                            projectId: share.projectId,
                            start: share.start,
                            end: share.end,
                            token: share.token,
                            name: share.name,
                            cible: []
                        }
                        share.cible.forEach((cible) =>
                        {
                            const { _id, email, firstName, lastName } = cible;
                            response.cible.push({
                                id: _id,
                                email,
                                firstName,
                                lastName
                            });
                        });
                        sharedSchedules.push(response);
                    });
                }
            });
            return sharedSchedules;
        },
        verifySharedScheduleToken: async (_, args) =>
        {
            const { token } = args;
            const { payload } = getScheduleSharingPayload(token);

            if (payload === null) {
                throw new Error(INVALIDE_SHARE_TOKEN_ERROR.toString())
            }

            return {
                succes: true
            }
        },
        getSharedSchedule: async (_, args) =>
        {
            const { token } = args
            const { payload } = getScheduleSharingPayload(token);
            const { shareId } = payload;

            const share = await ScheduleShare.findById(shareId);

            if (share == null) {
                throw new AuthenticationError(INVALIDE_SHARE_TOKEN_ERROR.toString());
            }

            const { projectId, start, end } = share;
            const events = [];
            await Event.find({ projectId }, (_, eventsData) =>
            {
                if (eventsData != undefined) {
                    eventsData.forEach((event) =>
                    {
                        if (event.state === "pending") {
                            const data = {
                                id: event._id,
                                name: event.name,
                                title: event.title,
                                token: event.token,
                                start: fullCalendarDateFormat(event.start),
                                startTime: fullCalendarTimeFormat(event.start),
                                projectId: event.projectId,
                                state: event.state
                            }
                            if (event.end != undefined) {
                                data['end'] = fullCalendarDateFormat(event.end);
                            }
                            events.push(data);
                        }
                    });
                }
            });
            const finalEvent = events.filter((event) =>
            {
                const startDate = new Date(start).getTime();
                const endDate = new Date(end).getTime();
                const eventDate = new Date(`${event.start} ${event.startTime}`).getTime();
                return (eventDate >= startDate) && (endDate >= eventDate);
            });

            finalEvent.sort((a, b) =>
            {
                const aDate = new Date(`${a.start} ${a.startTime}`);
                const bDate = new Date(`${b.start} ${b.startTime}`);

                return aDate - bDate;
            });
            return finalEvent;
        }
    },
    Mutation: {
        addEvent: async (_, args) =>
        {
            const file = await args.file;
            const { addedBy, title, start, end, description, projectId, projectTitle } = args;

            let image = null;

            if (file) {
                const fileLoaded = await processUpload(file, `/${projectTitle}/events`);
                const fileSize = getFileUploadedSize(fileLoaded.src);

                const attachement = new Attachement({ src: fileLoaded.src, addedBy, size: fileSize });
                attachement.save();
                image = attachement._id;
            }

            const event = new Event({
                title,
                start,
                end,
                description,
                projectId,
                image
            });
            event.save();

            console.log(event);

            const response = {
                id: event._id,
                title: event.title,
                start: fullCalendarDateFormat(event.start),
                startTime: fullCalendarTimeFormat(event.start),
                projectId: event.projectId,
                state: event.state
            }
            if (event.end != undefined) {
                response['end'] = event.end;
            }
            return response
        },
        updateEvent: async (_, args) =>
        {
            const { id, title, start } = args;
            const event = await Event.findByIdAndUpdate(id, { $set: { title, start } }, { new: true });
            return {
                id: event._id,
                title: event.title,
                start: fullCalendarDateFormat(event.start),
                startTime: fullCalendarTimeFormat(event.start),
                state: event.state,
                projectId: event.projectId
            }
        },
        updateEventState: async (_, args) =>
        {
            const { id, state } = args;
            const validInput = ['pending', 'confirmed', 'denied'];

            if (!validInput.includes(state)) {
                throw new AuthenticationError(INVALIDE_INPUT_ERROR.toString());
            }

            const event = await Event.findByIdAndUpdate(id, { $set: { state } }, { new: true });
            if (event == null) {
                throw new AuthenticationError(EVENT_INVALIDE_ERROR.toString());
            }
            return {
                id: event._id,
                title: event.title,
                start: fullCalendarDateFormat(event.start),
                startTime: fullCalendarTimeFormat(event.start),
                state: event.state,
                projectId: event.projectId
            }
        },
        deleteEvent: async (_, args) =>
        {
            const { id } = args;
            await Event.findByIdAndDelete(id);
            return {
                id
            }
        },
        sendNotes: async (_, args) =>
        {
            const { id, note } = args;
            const { message, senderType, sender, recieverType, reciever } = note;
            const noteObj = new Note({
                message,
                senderType,
                sender,
                recieverType,
                reciever,
                createdAt: new Date()
            });
            const event = await Event.findById(id);

            if (event == null) throw new AuthenticationError(EVENT_INVALIDE_ERROR.toString());

            event.notes.push(noteObj);
            event.save();

            const res = {
                id: noteObj._id,
                message: noteObj.message,
                senderType: noteObj.senderType,
                sender: noteObj.sender,
                recieverType: noteObj.recieverType,
                reciever: noteObj.reciever,
                createdAt: new Date(),
                eventId: id
            };

            pubsub.publish('NOTE_SEND', { noteSend: res });

            return res;
        },
        generateScheduleLink: async (_, args) =>
        {
            const { projectId, start, end, cible, name } = args;
            const scheduleLink = { name, projectId, start, end, cible: [] };
            cible.forEach((val) =>
            {
                const { email, firstName, lastName } = val;
                scheduleLink.cible.push({ email, firstName, lastName });
            });
            const scheduleShare = new ScheduleShare(scheduleLink);
            const token = getScheduleSharingToken({ shareId: scheduleShare._id });
            scheduleShare.token = token;
            scheduleShare.save();

            const response = {
                id: scheduleShare._id,
                name: scheduleShare.name,
                token: scheduleShare.token,
                projectId: scheduleShare.projectId,
                start: scheduleShare.start,
                end: scheduleShare.end,
                cible: []
            }
            if (scheduleShare.cible != undefined) {
                scheduleShare.cible.forEach((cible) =>
                {
                    const { _id, email, firstName, lastName } = cible;
                    response.cible.push({
                        id: _id,
                        email,
                        firstName,
                        lastName
                    });
                })
            }
            return response;
        },
        addUserToScheduleLink: async (_, args) =>
        {
            const { sharedLinkId, user } = args;
            const { email, firstName, lastName } = user;
            const schedule = await ScheduleShare.findByIdAndUpdate(sharedLinkId,
                {
                    $push: {
                        cible: {
                            email,
                            firstName,
                            lastName
                        }
                    }
                }, { new: true }
            );
            if (schedule == null) throw new AuthenticationError(SCHEDULE_INVALIDE_ERROR.toString());
            const response = {
                id: schedule._id,
                name: schedule.name,
                projectId: schedule.projectId,
                start: schedule.start,
                end: schedule.end,
                token: schedule.token,
                cible: []
            };
            schedule.cible.forEach((cible) =>
            {
                const { _id, email, firstName, lastName } = cible;
                response.cible.push({
                    id: _id,
                    email,
                    firstName,
                    lastName
                });
            });
            return response
        },
        deleteUserFromScheduleLink: async (_, args) =>
        {
            const { sharedLinkId, cibleId } = args;
            const schedule = await ScheduleShare.findByIdAndUpdate(sharedLinkId,
                {
                    $pull:
                    {
                        cible: { _id: cibleId }
                    }
                },
                { new: true });
            if (schedule == null) throw new AuthenticationError(SCHEDULE_INVALIDE_ERROR.toString());
            // const response = {
            //     id: schedule._id,
            //     name: schedule.name,
            //     projectId: schedule.projectId,
            //     start: schedule.start,
            //     end: schedule.end,
            //     token: schedule.token,
            //     cible: []
            // };
            // schedule.cible.forEach((cible) =>
            // {
            //     const { _id, email, firstName, lastName } = cible;
            //     response.cible.push({
            //         id: _id,
            //         email,
            //         firstName,
            //         lastName
            //     });
            // });
            return { succes: true };
        },
        deleteScheduleLink: async (_, args) =>
        {
            const { id } = args;
            await ScheduleShare.findByIdAndDelete(id);
            return {
                succes: true
            }
        },
        updateScheduleLinkUser: async (_, args) =>
        {
            const { sharedLinkId, userId, email, firstName, lastName } = args;
            const modif = {};
            if (email != undefined) {
                modif['cible.$.email'] = email;
            }
            if (firstName != undefined) {
                modif['cible.$.firstName'] = firstName;
            }
            if (lastName != undefined) {
                modif['cible.$.lastName'] = lastName;
            }
            const shared = await ScheduleShare.findOneAndUpdate({
                _id: sharedLinkId,
                "cible._id": userId
            }, {
                $set: {
                    ...modif
                },
            }, { new: true });

            if (shared == null) {
                throw new AuthenticationError(SCHEDULE_INVALIDE_ERROR.toString());
            }

            const response = {
                id: shared._id,
                name: schedule.name,
                projectId: shared.projectId,
                start: shared.start,
                end: shared.end,
                token: shared.token,
                cible: []
            };
            shared.cible.forEach((cible) =>
            {
                const { _id, email, firstName, lastName } = cible;
                response.cible.push({
                    id: _id,
                    email,
                    firstName,
                    lastName
                });
            });
            return response
        }
    },
    Subscription: {
        noteSend: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(['NOTE_SEND']),
                (payload, variables) =>
                {
                    const { eventId, listenerType } = variables;
                    return (payload.noteSend.eventId === eventId && payload.noteSend.senderType !== listenerType);
                }
            )
        }
    }
}