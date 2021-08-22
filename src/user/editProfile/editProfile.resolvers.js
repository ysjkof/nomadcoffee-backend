import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import { deleteUploadedFile, uploadToS3 } from "../../shared/shared.utils";

const resolverFn = async (
  _,
  {
    username,
    email,
    name,
    location,
    password: newPassword,
    avatar,
    githubUsername,
  },
  { loggedInUser }
) => {
  let avatarUrl = null;
  if (avatar) {
    const user = await client.user.findUnique({
      where: { id: loggedInUser.id },
      select: { avatarURL: true },
    });
    if (user?.avatarURL) {
      await deleteUploadedFile(user.avatarURL, "avatar");
    }
    avatarURL = await uploadToS3(avatar, loggedInUser.id, "avatar");
  }

  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      username,
      email,
      name,
      location,
      ...(uglyPassword && { password: uglyPassword }),
      ...(avatarUrl && { avatarURL }),
      githubUsername,
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update profile.",
    };
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};
