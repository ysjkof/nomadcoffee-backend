import { gql } from "apollo-server-express";

export default gql`
  scalar Upload
  type Mutation {
    editProfile(
      username: String
      email: String
      name: String
      location: String
      password: String
      avatarURL: Upload
      githubUsername: String
    ): MutationResponse!
  }
`;
