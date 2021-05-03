import { gql } from 'apollo-server';

export const project = gql`
    type Query {
  }

    type Mutation {
    createProject(name: String!, owner: String!): BasicResponse
    createTaskType(name: String!): BasicResponse
  }

    type Subscription {
   
  }
`;
