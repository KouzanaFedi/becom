import { gql } from 'apollo-server';

export const account = gql`
    type Query {
    verifyRecupCode(email:String!,code:String!): BasicResponse
  }

    type Mutation {
    login(email: String!, password: String!): User
    register(name: String!, password: String!, email: String!): User
    generateRecupCode(email: String!): BasicResponse
    updatePassword(email: String!, newPassword: String!): BasicResponse
  }

    type Subscription {
    usersCreated: User
  }
`;
