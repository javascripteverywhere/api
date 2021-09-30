const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const {ApolloServer} = require('apollo-server-express');

require('dotenv').config();
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const db = require('./db');
db.connect(DB_HOST);
const models = require('./models');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

app.get("/users", async (req, res) => {
    const data = await models.User.find();
    res.json(data)
})


app.get("/notes", async (req, res) => {
    const data = await models.Note.find();
    res.json(data)
})

//add fn for check user token
const getUser = token => {
    if (token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (e) {
            throw new Error("Session error!!!");
        }
    }
};


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        const token = req.headers.authorization;
        const user = getUser(token);
        console.log(user)
        return {models, user};
    }
});

server.applyMiddleware({app, path: '/api'});

app.listen({port}, () =>
    console.log(
        `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    )
);
