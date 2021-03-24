import { gql } from 'apollo-server';

export const query = gql`
  type Msg{
    msg: String!
  }
  type Query {
    hi: Msg
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
