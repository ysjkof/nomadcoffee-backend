import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    unfollow: protectedResolver(async (_, { username }, { loggedInUser }) => {
      const user = await client.user.findUnique({
        where: {
          username,
        },
        select: {
          id: true,
        },
      });
      if (!user) {
        return {
          ok: false,
          error: "사용자 이름에 해당하는 계정을 찾을 수 없습니다.",
        };
      }

      await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          following: {
            disconnect: {
              username,
            },
          },
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
