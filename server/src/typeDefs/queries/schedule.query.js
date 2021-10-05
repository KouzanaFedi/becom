import { gql } from 'apollo-server-express';

export const schedule = gql`
    type Query {
    holidaysEvent: [HolidaysEvent!]!
    eventsByProjectId(projectId:String!): [Event!]!
    getSharedSchedule(token: String!): [Event!]!
    eventNotes(id: String!): [Note!]!
    verifySharedScheduleToken(token: String!): BasicResponse
    getSharedSchedulesByProjecId(projectId: String!): [ScheduleShare!]!
  }

    type Mutation {
    addEvent(title: String!, start: String!, end: String, description: String!, projectId: String!, file: Upload, addedBy: String!, projectTitle: String!): Event
    updateEvent(id: String!, title:String!, start: String!, description: String!, end: String!): Event
    deleteImageFromEvent(id: String!): BasicResponse
    addImageToEvent(id: String!, addedBy: String!, projectTitle: String!, file: Upload!): Attachement
    deleteEvent(id: String!): IdResponse
    updateEventState(id: String!, state: String!): Event
    generateScheduleLink(projectId: String!, name: String!, start: String!, end: String!, cible: [CibleInput!]!): ScheduleShare
    sendNotes(id: String!, note: NoteInput): Note
    addUserToScheduleLink(sharedLinkId: String!, user: CibleInput!): ScheduleShare
    deleteUserFromScheduleLink(sharedLinkId: String!, cibleId: String!): BasicResponse
    deleteScheduleLink(id: String!) : BasicResponse
    updateScheduleLinkUser(sharedLinkId: String!, userId: String!, email: String, firstName: String, lastName: String) : ScheduleShare
  }

    type Subscription {
    noteSend(eventId: String!, listenerType: String!): Note
  }
`;
