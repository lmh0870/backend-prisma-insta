import client from "../../client";

export default {
  Query: {
    seePhotoComments: (_, { id }) =>
      client.photo
        .findUnique({
          where: {
            id,
          },
          orderBy: {
            createdAt: "asc",
          },
        })
        .Comment(),
  },
};
