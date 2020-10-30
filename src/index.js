const express = require('express');
const app = express();

const { ApolloServer, gql } = require('apollo-server-express');


let notes = [
    {
      id: '1',
      content: 'This is a note',
      author: 'Adam Scott'
    },
    {
      id: '2',
      content: 'This is another note',
      author: 'Harlow Everly'
    },
    {
      id: '3',
      content: 'Oh hey look, another note!',
      author: 'Riley Harrison'
    }
  ];
  

const typeDefs = gql`
    type Query {
        hello: String
        notes: [Note!]!
        note(id: ID!): Note
    }
    type Note {
        id: ID!
        content: String!
        author: String!
    }

`;

const resolvers = {
    Query: {
        hello: () => "hello world",
        notes: () => notes,
        note: (parent, args) => {
            return notes.find(note => note.id === args.id);
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

// apollo graphql middle
server.applyMiddleware({ app, path: '/api'});

app.get('/', (req, res) => res.send('Hello World'));

const port = process.env.PORT || 4000;
app.listen(4000,  () => console.log(`GraphQL server running at http://localhost:${port}${server.graphqlPath}`));