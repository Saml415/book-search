const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    getMe: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
  type Auth {
    token: ID!
    user: User
  }
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: String!
    image: String
    link: String
    title: String!
  }
`;

module.exports = typeDefs;
