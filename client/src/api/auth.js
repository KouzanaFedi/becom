import { gql } from "@apollo/client";

export const LOGIN = gql`
  query loginQuery($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
      id
    }
  }
`;

export const USER_CREATION_SUB = gql`
  subscription UserSub {
    usersCreated {
      name
    }
  }
`;
