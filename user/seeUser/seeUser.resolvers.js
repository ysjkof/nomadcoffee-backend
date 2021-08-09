import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { username }, { loggedInUser }) => {
      const ok = await client.user.findUnique({ where: { username } });
      if (!ok) {
        return {
          ok: false,
          error: "That user does not exist.",
        };
      }
      await client.user.update({
        where: { id: loggedInUser.id },
        data: { following: { connect: { username: username } } },
      });
      return { ok: true };
    }),
    unfollowUser: protectedResolver(
      async (_, { username }, { loggedInUser }) => {
        const ok = await client.user.findUnique({ where: { username } });
        if (!ok) {
          return {
            ok: false,
            error: "Can't unfollow user.",
          };
        }
        await client.user.update({
          where: { id: loggedInUser.id },
          data: { following: { disconnect: { username } } },
        });
        return {
          ok: true,
        };
      }
    ),
  },

  Query: {
    // offset pagination
    seeUser: async (_, { page }) => {
      const users = await client.user.findMany({
        take: 5,
        skip: (page - 1) * 5,
      });
      const totalUsers = await client.user.count({});
      return {
        ok: true,
        users,
        totalPages: Math.ceil(totalUsers / 5),
      };
    },
  },

  User: {
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exists);
    },
  },
};
