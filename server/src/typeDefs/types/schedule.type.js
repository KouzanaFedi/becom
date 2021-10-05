import { gql } from 'apollo-server-express';

export const scheduleType = gql`
  type HolidaysEvent {
    title: String!
    start: String!
    end: String
  }

  type Event {
    _id: ID!
    title: String!
    description: String!
    start: String!
    end: String!
    image: Attachement
    state: String!
  }

  type IdResponse{
    id: ID!
  }

  type ScheduleShare {
    id: ID!
    projectId: ID!
    name: String!
    start: String!
    end: String!
    token: String!
    cible: [Cible!]!
  }

  type Cible {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
  }

  input CibleInput {
    email: String!
    firstName: String!
    lastName: String!
  }

  type Note {
    id: ID!
    message: String!
    senderType: String!
    sender: String!
    recieverType: String!
    reciever: String!
    createdAt: String!
    eventId: String
  }

  input NoteInput {
    message: String!
    senderType: String!
    sender: String!
    recieverType: String!
    reciever: String!
  }
`;
