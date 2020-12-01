//Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Note {
    id: ID
    content: String
    author: String
  }
  type Query {
    hello: String
    notes: [Note]
    note(id: ID): Note
  }
  type Mutation {
    newNote(content: String!): Note
  }
`;