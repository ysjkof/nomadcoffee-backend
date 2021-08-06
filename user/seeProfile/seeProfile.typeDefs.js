import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeProfile(username: String, id: Int): User
  }
`;
