const express = require('express');
const app = express();

const { ApolloServer, gql } = require('apollo-server-express');

const db = require('./db');
const models = require('./models');

require('dotenv').config();

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

    type Mutation {
        newNote(content: String): Note!
    }
`;

const resolvers = {
    Query: {
        hello: () => "hello world",
        notes: async () => {
            return await models.Note.find();
        },
        note: (parent, args) => {
            return notes.find(note => note.id === args.id);
        },
    },
    Mutation: {
        newNote: async (parent, args) => {
        return await models.Note.create({
            content: args.content,
            author: 'Leslie Roriguez'
        })
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

// apollo graphql middle
server.applyMiddleware({ app, path: '/api'});

app.get('/', (req, res) => res.send('Hello World'));

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

db.connect(DB_HOST);
app.listen(4000,  () => console.log(`GraphQL server running at http://localhost:${port}${server.graphqlPath}`));