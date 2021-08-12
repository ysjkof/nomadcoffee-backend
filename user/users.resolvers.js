import client from "../client";

export default {
  User: {
    following: ({ id }, { lastId }) =>
      client.user.findUnique({ where: { id } }).following({
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
    followers: ({ id }, { lastId }) =>
      client.user.findUnique({ where: { id } }).followers({
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};
