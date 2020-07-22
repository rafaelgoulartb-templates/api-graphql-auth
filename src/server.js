const express = require("express");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const cors = require("cors");
const typeDefs = require("./typeDefs.js");
const resolvers = require("./resolvers/index");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
app.use(cors());

app.use("/graphql", express.json(), graphqlExpress({ schema }));
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));


app.listen(3000, () => {
  console.log("Go to http://localhost:3000/graphiql to run queries!");
});
