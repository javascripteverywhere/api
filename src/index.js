const express = require('express');
const halmet = require('helmet');
const cors = require('cors');

const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');

const app = express();

app.use(cors());
app.use(halmet());



const jwt = require('jsonwebtoken');


require('dotenv').config();
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const db = require('./db');
db.connect(DB_HOST);
const models = require('./models');

const {ApolloServer} = require('apollo-server-express');
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
    validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
    context: ({req}) => {
        const token = req.headers.authorization;
        const user = getUser(token);
        return {models, user};
    }
});

server.applyMiddleware({app, path: '/api'});

app.listen({port}, () =>
    console.log(
        `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    )
);
