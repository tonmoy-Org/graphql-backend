const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const config = require("./config");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");
const { authMiddleware } = require("./utils/auth");

const startServer = async () => {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ user: authMiddleware(req) })
  });

  await server.start();
  server.applyMiddleware({ app });

  await mongoose.connect(config.MONGO_URI);
  console.log("Database connected");

  app.listen(config.PORT, () =>
    console.log(`Server running at http://localhost:${config.PORT}/graphql`)
  );
};

startServer();
