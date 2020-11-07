const { gql } = require('apollo-server-express');
const { models } = require('mongoose');

module.exports = gql`
    scalar DateTime

    type Query {
        hello: String
        notes: [Note!]!
        note(id: ID!): Note
        getUsers: [User!]!
    }

    type Note {
        id: ID!
        content: String!
        author: User!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type User {
        id: ID!
        username: String!
        email: String!
        avatar: String!
        notes: [Note!]!
    }

    type Mutation {
        newNote(content: String): Note!
        updateNote(id: ID!, content: String): Note!
        deleteNote(id: ID!): Boolean!
        signUp(username: String!, email: String!, password: String!): String!
        signIn(username: String, email: String, password: String!): String!
    }
`;
