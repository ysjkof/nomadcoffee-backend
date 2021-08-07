require("dotenv").config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./user/users.utils";
import { graphqlUploadExpress } from "graphql-upload";

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  uploads: false,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  },
});

const app = express();
app.use(logger("tiny"));
app.use(graphqlUploadExpress());
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));
app.listen({ port: PORT }, () => {
  console.log(`🚀Server is running on http://localhost:${PORT} ✅`);
});
