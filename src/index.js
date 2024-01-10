const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();

//run server on port in .env file or use 4000
const port = process.env.PORT || 4000;

//define schema using GraphQL schema language
const typeDefs = gql`
 type Note {
    id: ID!
    content: String!
    author: String!
  }

  type Query {
    hello: String!
    notes: [Note!]!
    note(id: ID!): Note!
  }
`;

//resolver function for schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello World!',
    notes: () => notes,
    note: (parent, args) => {
        return notes.find(note => note.id === args.id);
    }
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

let notes = [
    { id: '1', content: 'This is a note', author: 'Adam Scott' },
    { id: '2', content: 'This is another note', author: 'Harlow Everly' },
    { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' }
];
