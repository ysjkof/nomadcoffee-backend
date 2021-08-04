import { gql } from "apollo-server";

export default gql`
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String!
      location: String
      password: String!
      avatarURL: String
      githubUsername: String
    ): CreateAccountResult
  }
`;
