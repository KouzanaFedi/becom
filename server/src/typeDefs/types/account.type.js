import { gql } from 'apollo-server-express';

export const accountType = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    token: String!
    image: String
    createdAt: String
    updatedAt: String
  }

  type GenerateRecupCodeResponse {
    email: String!
    code: String!
    createdAt: String!
  }

  type BasicResponse {
    succes: Boolean!
  }
 

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type ImageName {
    name: String!
  }
`;
