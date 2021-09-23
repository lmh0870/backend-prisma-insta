import client from "../../client";

export default {
  Query: {
    searchUsers: async (_, { keyword, page }) => {
      const ok = client.user.findFirst({
        where: {
          username: {
            contains: keyword.toLowerCase(),
          },
        },
      });
      if (!ok) {
        return {
          ok: false,
          error: "Keyword not found",
        };
      }

      const searchings = await client.user.findMany({
        where: {
          username: {
            contains: keyword.toLowerCase(),
          },
        },
        take: 5,
        skip: (page - 1) * 5,
      });

      const totalSearching = await client.user.count({
        where: {
          username: {
            contains: keyword.toLowerCase(),
          },
        },
      });

      return {
        ok: true,
        searchings,
        totalPages: Math.ceil(totalSearching / 5),
      };
    },
  },
};
