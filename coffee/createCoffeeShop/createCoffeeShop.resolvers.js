import client from "../../client";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, categories, photo },
        { loggedInUser }
      ) => {
        const createdShop = await client.coffeeShop.create({
          data: {
            name,
            latitude,
            longitude,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            categories: {
              connectOrCreate: {
                where: { name: categories },
                create: { name: categories },
              },
            },
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
