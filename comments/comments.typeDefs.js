import { gql } from "apollo-server-core";

export default gql`
  type Comment {
    id: Int!
    createdAt: String!
    updatedAt: String!
    isMine: String!
    user: User!
    photo: Photo!
    payload: String!
  }
`;
