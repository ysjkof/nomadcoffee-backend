import client from "../../client";

export default {
  Query: {
    seeProfile: (_, { username, id }) =>
      client.user.findUnique({
        where: {
          username,
          id,
        },
        include: {
          following: true,
          followers: true,
        },
      }),
  },
};
