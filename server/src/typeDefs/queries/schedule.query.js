import { gql } from 'apollo-server';

export const schedule = gql`
    type Query {
    holidaysEvent: [HolidaysEvent!]!
    eventsByProjectId(projectId:String!): [Event!]!
    getSharedSchedule(token: String!,password: String!): [Event!]!
    eventNotes(id: String!): [Note!]!
    getSharedSchedulesByProjecId(projectId: String!): [ScheduleShare!]!
  }

    type Mutation {
    createProject(name: String!):BasicResponse
    addEvent(title: String!, start: String!, end: String, projectId: String!): Event
    updateEvent(id: String!, title:String!, start: String!): Event
    deleteEvent(id: String!): EventId
    updateEventState(id: String!, state: String!): Event
    generateScheduleLink(projectId: String!, name: String!, start: String!, end: String!, password: String!, cible: [CibleInput!]!): ScheduleShare
    sendNotes(id: String!, note: NoteInput): Note
    addUserToScheduleLink(sharedLinkId: String!, user: CibleInput!): ScheduleShare
    deleteUserFromScheduleLink(sharedLinkId: String!, cibleId: String!): ScheduleShare
    deleteScheduleLink(id: String!) : BasicResponse
    updateScheduleLinkUser(sharedLinkId: String!, userId: String!, email: String, firstName: String, lastName: String) : ScheduleShare
  }

    type Subscription {
    noteSend(eventId: String!): Note
  }
`;
