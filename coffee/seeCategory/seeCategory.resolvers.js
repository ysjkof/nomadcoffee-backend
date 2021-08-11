import client from "../../client";

export default {
  Query: {
    seeCategory: (_, { categoryName, page }) =>
      client.category.findMany({
        where: { name: categoryName },
        take: 5,
        skip: (page - 1) * 5,
      }),
  },
};
