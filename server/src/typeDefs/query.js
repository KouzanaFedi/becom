import { gql } from 'apollo-server';

export const query = gql`
  type Query {
    me: User
  }
  type Mutation {
    register(name: String!, password: String!): User
    login(name: String!, password: String!): User
  }
`;
