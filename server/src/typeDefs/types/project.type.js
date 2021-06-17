import { gql } from 'apollo-server-express';

export const projectType = gql`
  type Project{
    id: ID!
    name: String!
    owner: String!
  }

  type TaskType {
    id: ID!
    name: String!
    active: Boolean
  }

  type Task {
    id: ID!
    name: String!
    description: String!
    taskType: TaskType!
    assignedTo: String!
    start: String!
    end: String
    state: String!
    priority: Int!
    projectId: String!
  }

  type ProjectData {
    id: ID!
    name: String!
    owner: String!
    tasks: [Task!]!
  }

  type TaskState {
    id: ID!
    fromState: String!
    toState: String!
  }

`;
