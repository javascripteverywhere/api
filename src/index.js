const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();

//run server on port in .env file or use 4000
const port = process.env.PORT || 4000;

//define schema using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

//resolver function for schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello World!'
  }
};

//setup apollo server
const server = new ApolloServer({ typeDefs, resolvers });
//apply apollo graphql middleware and set path to /api
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);

