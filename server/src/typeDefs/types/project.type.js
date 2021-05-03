import { gql } from 'apollo-server';

export const projectType = gql`
  type TaskType {
    id: ID!
    name: String!
  }

`;
