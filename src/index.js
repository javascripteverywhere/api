const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

require('dotenv').config();

const DB_HOST = process.env.DB_HOST;
const port = process.env.PORT || 4000;


const db = require('./db');
db.connect(DB_HOST);

const models = require('./models')


const typeDefs = gql`
    type Note {
        id: ID!,
        content: String!,
        author: String!
    }

    type Query {
        notes: [Note!]!,
        note(id: ID!): Note!
    }

    type Mutation {
        newNote(content: String!): Note!
    }

`;

const resolvers = {
  Query: {
    notes: async () => await models.Note.find(),
    note: (parent, args) => {
      return models.Note.findById(args.id);
    }
  },

  Mutation: {

    newNote: async (parent, args) => {
      return await models.Note.create({
        content: args.content,
        author: "Olek Kalashnyk"
      });
    }
  }

};


const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: '/api' });

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(port, () => {
  console.log(`App start  http://localhost:${port}`);
});