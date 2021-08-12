import client from "../../client";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, longitude, categories, photo },
        { loggedInUser }
      ) => {
        const shop = await client.coffeeShop.findUnique({
          where: { id },
          include: { categories: { select: { id: true } } },
        });
        if (!shop) {
          return { ok: false, errot: "there is not the shop" };
        }

        try {
          await client.coffeeShop.update({
            where: {
              id,
            },
            data: {
              name,
              latitude,
              longitude,
              ...(category && {
                categories: {
                  disconnect: shop.categories,
                  connectOrCreate: processCategory(category),
                },
              }),
            },
          });

          if (file) {
            const photoUrl = await handleFile(file, loggedInUser.id);
            await client.coffeeShopPhoto.create({
              data: {
                url: photoUrl,
                shop: {
                  connect: {
                    id,
                  },
                },
              },
            });
          }
          return {
            ok: true,
          };
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
