import { Event, Note } from "../schema/schedule/event";
import { ScheduleShare } from "../schema/schedule/scheduleShare";
import { Holidays } from "../schema/schedule/holidays"
import { fullCalendarDateFormat, fullCalendarTimeFormat, getScheduleSharingPayload, getScheduleSharingToken } from "../utils/util";
import { AuthenticationError } from "apollo-server-errors";
import { INVALIDE_SHARE_TOKEN_ERROR, SCHEDULE_INVALIDE_ERROR, EVENT_INVALIDE_ERROR, INVALIDE_INPUT_ERROR } from "../utils/errors/EventError";
import { PubSub, withFilter } from "graphql-subscriptions";
import { getFileUploadedSize, processUpload } from "../utils/fileUpload";
import { Attachement } from "../schema/project/attachement";
import { resolve } from "path";
import { unlinkSync } from 'fs';
import { sendPlanningLink } from "../utils/mailer";
import { Types } from "mongoose";

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
            return await Event.find({ projectId })
                .select({ "__v": 0, "notes": 0, "projectId": 0 })
                .populate({
                    path: 'image',
                    select: { 'updatedAt': 0, '__v': 0 },
                    populate: {
                        path: 'addedBy',
                        model: 'users',
                        select: { 'updated_at': 0, '__v': 0, 'password': 0, 'created_at': 0 },
                    }
                });
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
                    _id,
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
            const schedule = await ScheduleShare.find({ projectId })
                .select({ "__v": 0 });
            return schedule;
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

            const share = await ScheduleShare.findById(payload.shareId).select({ "__v": 0 });

            const events = await Event.find({ projectId: share.projectId }).select({ "__v": 0, "projectId": 0 })
                .populate({
                    path: 'image',
                    select: { 'updatedAt': 0, '__v': 0 },
                    populate: {
                        path: 'addedBy',
                        model: 'users',
                        select: { 'updated_at': 0, '__v': 0, 'password': 0, 'created_at': 0 },
                    }
                });;

            const pendingEvents = events.filter(event => event.state === "pending");
            const eventsOfIntervalAndSorted = pendingEvents.filter(event =>
            {
                const startDate = new Date(share.start).getTime();
                const endDate = new Date(share.end).getTime();
                const eventDate = new Date(event.start).getTime();
                return (eventDate >= startDate) && (endDate >= eventDate);
            });

            eventsOfIntervalAndSorted.sort((a, b) => new Date(a.start).getTime() - new Date(b.start));


            console.log(eventsOfIntervalAndSorted);

            return {
                ...share._doc,
                selectedCible: payload.user != null ? {
                    ...payload.user, token
                } : null,
                events: eventsOfIntervalAndSorted
            }
        }
    },
    Mutation: {
        addEvent: async (_, args) =>
        {
            const file = await args.file;
            const { addedBy, title, start, end, description, projectId, projectTitle } = args;

            let image = null;
            let imageRes = null;

            if (file) {
                const fileLoaded = await processUpload(file, `/${projectTitle}/events`);
                const fileSize = getFileUploadedSize(fileLoaded.src);

                const attachement = new Attachement({ src: fileLoaded.src, addedBy, size: fileSize });
                attachement.save();
                image = attachement._id;
                imageRes = {
                    _id: attachement._id,
                    src: fileLoaded.src,
                    addedBy,
                    createdAt: new Date().getTime(),
                    size: fileSize
                }
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


            return {
                _id: event._id,
                title: event.title,
                description: event.description,
                start: fullCalendarDateFormat(event.start),
                end: fullCalendarDateFormat(event.end),
                state: event.state,
                image: imageRes
            }
        },
        updateEvent: async (_, args) =>
        {
            const { id, title, description, start, end } = args;
            const event = await Event.findByIdAndUpdate(id, { $set: { title, start, description, end, state: "pending" } }, { new: true });

            return {
                _id: event._id,
                title: event.title,
                description: event.description,
                start: fullCalendarDateFormat(event.start),
                end: fullCalendarDateFormat(event.end),
                image: event.image,
                state: event.state,
            }
        },
        addImageToEvent: async (_, args) =>
        {
            const file = await args.file;
            const { addedBy, id, projectTitle } = args;

            const fileLoaded = await processUpload(file, `/${projectTitle}/events`);
            const fileSize = getFileUploadedSize(fileLoaded.src);

            const attachement = new Attachement({ src: fileLoaded.src, addedBy, size: fileSize });
            attachement.save();

            const event = await Event.findById(id);
            event.image = attachement._id;
            event.annotation = [];
            event.state = "pending";
            event.save();

            return {
                _id: attachement._id,
                src: fileLoaded.src,
                addedBy,
                createdAt: new Date().getTime(),
                size: fileSize
            }
        },
        deleteImageFromEvent: async (_, args) =>
        {
            const { id } = args;
            const event = await Event.findById(id);

            const imageId = event.image;
            event.image = null;
            event.annotation = [];
            event.state = "pending";
            event.save();

            const image = await Attachement.findByIdAndDelete(imageId);

            const BASE_DIR = resolve(__dirname, '..', '..', 'public');
            unlinkSync(BASE_DIR + image.src);

            return {
                succes: true
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
                _id: event._id,
                title: event.title,
                description: event.description,
                start: fullCalendarDateFormat(event.start),
                end: fullCalendarDateFormat(event.end),
                state: event.state,
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
                _id: noteObj._id,
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
            const { projectId, start, end, name } = args;
            const scheduleLink = { name, projectId, start, end, cible: [] };

            const scheduleShare = new ScheduleShare(scheduleLink);
            const token = getScheduleSharingToken({ shareId: scheduleShare._id, user: null });
            scheduleShare.token = token;
            scheduleShare.save();

            return scheduleShare;
        },
        addUserToScheduleLink: async (_, args) =>
        {
            const { sharedLinkId, email, name } = args;
            const schedule = await ScheduleShare.findByIdAndUpdate(sharedLinkId,
                {
                    $push: {
                        cible: {
                            email,
                            name
                        }
                    }
                }, { new: true }
            );
            const addedUser = schedule.cible.pop();
            const token = getScheduleSharingToken({ shareId: sharedLinkId, user: addedUser });
            await ScheduleShare.updateOne({ _id: sharedLinkId, 'cible._id': addedUser._id },
                {
                    $set: {
                        'cible.$.token': token
                    }
                }, { new: true }
            );

            return {
                ...addedUser._doc,
                token
            };;
        },
        sendCustomLinkEmail: async (_, args) =>
        {
            const { id, baseLink, sharedId } = args;
            const shared = await ScheduleShare.findById(sharedId);
            const cible = shared.cible.find((c) => c._id == id);
            await sendPlanningLink(baseLink + cible.token, cible.email, shared.name);
            return {
                succes: true
            }
        },
        deleteUserFromScheduleLink: async (_, args) =>
        {
            const { sharedLinkId, cibleId } = args;
            await ScheduleShare.findByIdAndUpdate(sharedLinkId,
                {
                    $pull:
                    {
                        cible: { _id: cibleId }
                    }
                },
                { new: true });

            return {
                succes: true
            };
        },
        deleteScheduleLink: async (_, args) =>
        {
            const { id } = args;
            await ScheduleShare.findByIdAndDelete(id);
            return {
                succes: true
            }
        },
        addAnnotationToEvent: async (_, args) =>
        {
            const { id, text, height, type, width, x, y } = args;
            const event = await Event.findByIdAndUpdate(id, {
                $push: {
                    annotations: {
                        text,
                        height,
                        type,
                        width,
                        x,
                        y
                    }
                }
            }, { new: true });

            return event.annotations.pop()._doc;

        },
        deleteAnnotationFromEvent: async (_, args) =>
        {
            const { idEvent, id } = args;
            await Event.findByIdAndUpdate(idEvent, {
                $pull:
                {
                    annotations: { _id: id }
                }
            }, { new: true });

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