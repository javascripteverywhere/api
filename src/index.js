const express = require('express');
const app = express();
// Apollo server enables us to serve data as a graphql API from a Node.js application.
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const db = require('./db');
const models = require('./models');

require('dotenv').config();

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: () => {
        return { models };
    }
});

// apollo graphql middle
server.applyMiddleware({ app, path: '/api'});

app.get('/', (req, res) => res.send('Hello World'));

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

db.connect(DB_HOST);
app.listen(4000,  () => console.log(`GraphQL server running at http://localhost:${port}${server.graphqlPath}`));