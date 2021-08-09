import { gql } from "apollo-server-express";

export default gql`
  type FollowUserResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    followUser(username: String!): FollowUserResult
  }
  type UnfollowUserResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    unfollowUser(username: String!): UnfollowUserResult
  }
  type SeeUserResult {
    ok: Boolean!
    error: String
    users: [User]
    totalPages: Int
  }
  type Query {
    seeUser(page: Int!): SeeUserResult!
  }
`;
