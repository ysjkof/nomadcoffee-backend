import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../user/users.utils";
import { processCategory } from "../coffShop.utiles";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, category, file },
        { loggedInUser }
      ) => {
        let photoUrl = null;
        if (file) {
          photoUrl = await uploadToS3(file, loggedInUser.id, "uploads");
        }
        try {
          const newShop = await client.coffeeShop.create({
            data: {
              name,
              latitude,
              longitude,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              ...(category && {
                categories: {
                  connectOrCreate: processCategory(category),
                },
              }),
              ...(photoUrl && {
                photos: {
                  create: {
                    url: photoUrl,
                  },
                },
              }),
            },
          });

          return { ok: true, coffeeShop: newShop };
        } catch (error) {
          return {
            ok: false,
            error: `${error}`,
          };
        }
      }
    ),
  },
};
