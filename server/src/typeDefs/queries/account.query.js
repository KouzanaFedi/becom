import { gql } from 'apollo-server-express';

export const account = gql`
    type Query {
    verifyRecupCode(email: String!,code: String!): BasicResponse
    verifyToken(token: String!): User
  }

    type Mutation {
    login(email: String!, password: String!): User
    register(name: String!, password: String!, email: String!): User
    generateRecupCode(email: String!): BasicResponse
    updatePassword(email: String!, newPassword: String!): BasicResponse
    uploadProfileImg(file: Upload!, email: String!): ImageName
  }
  
    type Subscription {
    usersCreated: User
  }
`;
