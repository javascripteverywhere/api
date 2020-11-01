const { gql } = require('apollo-server-express');

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
        updateNote(id: ID!, content: String): Note!
        deleteNote(id: ID!): Boolean!
    }
`;

module.exports = typeDefs;