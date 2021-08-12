import { gql } from "apollo-server-express";

export default gql`
  scalar Upload
  type CoffeeShop {
    id: Int!
    name: String!
    latitude: String!
    longitude: String!
    user: User!
    categories(lastId: Int): [Category]
    photos(lastId: Int): [CoffeeShopPhoto]
    createdAt: String!
    updatedAt: String!
  }
  type CoffeeShopPhoto {
    id: Int!
    url: String!
    shop: CoffeeShop!
    createdAt: String!
    updatedAt: String!
  }
`;
