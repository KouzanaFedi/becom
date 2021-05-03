import { gql } from 'apollo-server';

export const project = gql`
    type Query {
    getTaskTypes: [TaskType!]!
  }

    type Mutation {
    createProject(name: String!, owner: String!): BasicResponse
    createTaskType(name: String!): BasicResponse
  }

`;
