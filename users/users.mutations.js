import client from "../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("This username/password id already taken.");
        }

        const uglyPassword = await bcrypt.hash(password, 10);
        return client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
        // hash password
        // save and return the user
      } catch (e) {
        console.log(e);
        return e;
      }
    },
    login: async (_, { username, password }) => {
      // Find: User with args.username
      // Check: Password with args.password
      // Issue: A token and send it to the user
      const user = await client.user.findFirst({
        where: { username },
      });
      if (!user) {
        return {
          ok: false,
          error: "Uesr not found.",
        };
      }
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect password",
        };
      }
    },
  },
};
