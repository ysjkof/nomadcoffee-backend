import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (_, { username, email, name, password }) => {
      const existingUser = await client.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      });
      if (existingUser) {
        return {
          ok: false,
          error: "username or email already exists",
        };
      }
      const hashPassword = await bcrypt.hash(password, 10);
      await client.user.create({
        data: {
          username,
          email,
          name,
          password: hashPassword,
        },
      });
      return { ok: true };
    },
  },
};
