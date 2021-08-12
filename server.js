require("dotenv").config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./user/users.utils";

const app = express();

const PORT = process.env.PORT;
const server = new ApolloServer({
  resolvers,
  typeDefs,
  uploads: false,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token || null),
    };
  },
});

app.use(logger("tiny"));
app.use(graphqlUploadExpress());
app.use("/static", express.static("uploads"));
server.applyMiddleware({ app });
app.listen({ port: PORT }, () => {
  console.log(
    `🚀Server is running on http://localhost:${PORT}${server.graphqlPath} ✅`
  );
});
