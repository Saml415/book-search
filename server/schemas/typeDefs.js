const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    getMe: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(book: addBook!): User
    removeBook(book: ID!): User
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
    authors: [String]
    description: String
    bookId: ID
    image: String
    link: String
    title: String!
  }

  input addBook {
    authors: [String]
    description: String
    bookId: ID
    image: String
    link: String
    title: String!
  }

  input removeBook {
    authors: [String]
    description: String
    bookId: String!
    image: String
    link: String
    title: String!
  }
`;

module.exports = typeDefs;
