import { gql } from 'apollo-server';

export const userType = gql`
  type User {
    id: ID!
    name: String!
    password: String!
    email: String!
    token: String!
    createdAt: String!
    updatedAt: String!
  }

  type GenerateRecupCodeResponse {
    email: String!
    code: String!
    createdAt: String!
  }

  type BasicResponse {
    succes: Boolean!
  }
`;
