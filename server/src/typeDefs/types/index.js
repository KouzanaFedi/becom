import { gql } from 'apollo-server';

export const userType = gql`
  type User {
    id: ID!
    name: String!
    password: String!
    token: String
  }
`;
