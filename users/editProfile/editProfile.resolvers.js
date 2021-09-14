import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      let uglyPassword = null;
      if (password) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
      }
      const updateUser = await client.user.update({
        where: {
          id: 1,
        },
        data: {
          firstName,
          lastName,
          username,
          email,
          password,
          ...(uglyPassword && { password: uglyPassword }),
        },
      });
      if (updateUser.id) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: "Could not update profile.",
        };
      }
    },
  },
};
