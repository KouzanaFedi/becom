import { gql } from 'apollo-server-express';

export const projectType = gql`
  type Project{
    id: ID!
    title: String!
    createdAt: String!
  }

  type TaskState {
    id: ID!
    fromState: String!
    toState: String!
  }

  type Tag {
    _id: ID!
    title: String!
    color: String!
  }

  type Member {
    _id: ID!
    image: String
    name: String!
    email: String!
  }

  type ProjectNote {
    _id: ID!
    sender: Member
    message: String!
    createdAt: String!
  }

  type Attachement {
    _id: ID!
    src: String!
    addedBy: Member
    createdAt: String!
    size: Int
  }

  type Status {
    _id: String!
    type: String!
    title: String!
    color: String!
  }

  type Task {
    _id: ID!
    title: String!
    description: String!
    dueTime: String
    createdAt: String!
    coverImage: String
    notes: [ProjectNote!]!
    attachement: [Attachement!]!
    members: [Member!]!
    tags:[Tag!]!
    status: Status!
  }

  type Service {
    _id: String!
    title: String!
    description: String!
    dueTime: String!
    createdAt: String!
    tasks: [Task!]!
    notes: [ProjectNote!]!
  }

  type ProjectData {
    _id: ID!
    title: String!
    client: String!
    createdAt: String!
    statusOptions: [Status!]!
    services: [Service!]!
  }

`;
