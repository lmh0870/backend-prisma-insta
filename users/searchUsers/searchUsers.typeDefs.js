import { gql } from "apollo-server";

export default gql`
  type searchUsersResult {
    ok: Boolean!
    error: String
    searchings: [User]
    totalPages: Int!
  }
  type Query {
    searchUsers(keyword: String!, page: Int!): searchUsersResult!
  }
`;
