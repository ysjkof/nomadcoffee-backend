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
        const oldShop = await client.coffeeShop.findFirst({
          where: { id, userId: loggedInUser.id },
          include: { categories: { select: { name: true } } },
        });
        console.log(oldShop);
        if (!oldShop) {
          return { ok: false, errot: "there is not the shop" };
        }
        const isShop = await client.coffeeShop.update({
          where: { id },
          data: {
            name,
            latitude,
            longitude,
            ...(categories !== undefined && {
              categories: {
                disconnect: oldShop.categories,
                connectOrCreate: {
                  where: { name: categories },
                  create: { name: categories },
                },
              },
            }),
          },
        });
        if (photo) {
          await client.coffeeShopPhoto.create({
            data: {
              url: photo,
              shop: { connect: { id: createdShop.id } },
            },
          });
          return { ok: true };
        }
        return { ok: true };
      }
    ),
  },
};
