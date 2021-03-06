import { gql } from "apollo-server";

export default gql`
  type Photo {
    user: User!
    hashtags: [Hashtag]
    file: String!
    caption: String
    likes: Int!
    isMine: Boolean!
    isLiked: Boolean!
    commentNumber: Int!
    comments: [Comment]
    id: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Hashtag {
    id: Int!
    hashtag: String!
    photos(page: Int!): [Photo]
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Like {
    id: Int!
    photo: Photo!
    createdAt: String!
    updatedAt: String!
  }
`;
