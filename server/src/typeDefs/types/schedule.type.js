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
    notes: [Note!]
    annotations: [Annotation!]
  }

  type Annotation {
    _id: ID!
    text: String!
    height: String!
    type: String!
    width: String!
    x: String!
    y: String!
  }

  type IdResponse{
    id: ID!
  }

  type ScheduleShare {
    _id: ID!
    projectId: ID!
    name: String!
    start: String!
    end: String!
    token: String!
    cible: [Cible!]!
    selectedCible: Cible
    events:[Event!]!
  }

  type Cible {
    _id: ID!
    email: String!
    name: String!
    token: String!
  }

  type Note {
    _id: ID!
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
