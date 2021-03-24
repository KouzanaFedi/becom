import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation loginQuery($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      id
    }
  }
`;

export const REGISTER = gql`
  mutation registerQuery($name: String!, $email:String!, $password: String!) {
    register(name:$name, password:$password, email:$email){
      id
      token
      email      
    }
  }
`;

export const GENERATE_RECUP_CODE = gql`
  mutation generateRecupCodeQuery($email: String!){
    generateRecupCode(email:$email){
      succes
    }
  }
`;

export const VERIFY_RECUP_CODE = gql`
  query verifyRecupCodeQuery($email: String!,$code: String!){
    verifyRecupCode(email:$email, code:$code){
      succes
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePasswordQuery($email: String!,$password: String!){
    updatePassword(email:$email, newPassword:$password){
      succes
    }
  }
`

export const USER_CREATION_SUB = gql`
  subscription UserSub {
    usersCreated {
      name
    }
  }
`;
