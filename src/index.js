const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Run the server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000;

//Construct a schema, using GraphQL schema language
const typeDefs = gql`
type Query {
  hello: String
}
`;

// Provide resolver functions to our schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello World!'
  }
};

const app = express();

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
  console.log(
    'GraphQL Server running at http://localhost:${port}${server.graphqlPath}'
  )
);

// http://localhost:4000/api -> brings you to GraphQL playground.






