const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();

const db = require('./db');

const models = require('./models');

const DB_HOST = process.env.DB_HOST;
const port = process.env.PORT || 4000;

let notes = [
  { id: '1', content: 'This is a note', author: 'Adam Scott' },
  { id: '2', content: 'This is anothter note', author: 'Harlow Everly' },
  { id: '3', content: 'Oh hey look, another note!', author: 'Rilley Harrison' }
];

const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }
  type Query {
    hello: String
    notes: [Note]
    note(id: ID!): Note!
  }
  type Mutation {
    newNote(content: String!): Note!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world',
    note: async (parent, args) => {
      return await models.Note.findById(args.id);
    },
    notes: async () => {
      return await models.Note.find();
    }
  },
  Mutation: {
    newNote: async (parent, args) => {
      return await models.Note.create({
        content: args.content,
        author: 'Adam Scott'
      });
    }
  }
};

const app = express();

db.connect(DB_HOST);

//아폴로 서버 설정
const server = new ApolloServer({ typeDefs, resolvers });

//아폴로 그래프QL 미들웨어를 적용, 경로를 /api로 설정
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () => {
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  );
});
