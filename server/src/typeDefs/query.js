import { gql } from 'apollo-server';

export const query = gql`
  type Query {
    login(name: String!, password: String!): User
  }
  type Mutation {
    register(name: String!, password: String!): User
  }
  type Subscription {
    usersCreated: User
  }
`;
