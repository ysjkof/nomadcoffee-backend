import { gql } from "apollo-server-express";

export default gql`
  type Category {
    id: Int!
    name: String!
    slug: String!
    shops(lastId: Int): [CoffeeShop]
    totalShops: Int!
    createdAt: String!
    updatedAt: String!
  }
`;
