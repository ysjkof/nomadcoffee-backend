import client from "../client";

export default {
  CoffeeShop: {
    categories: ({ id }) =>
      client.category.findMany({ where: { shop: { some: { id } } } }),
  },
  Category: {
    totalShops: ({ id }) =>
      client.coffeeShop.count({ where: { categories: { some: { id } } } }),
    shops: ({ id }) =>
      client.coffeeShop.findMany({ where: { categories: { some: { id } } } }),
  },
};
