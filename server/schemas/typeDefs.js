const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    bookcount: String
    savedbooks: [Books]!
  }
 type Book {
    bookId: _bookId (Not the _id, but the book's id value returned from Google's Book API.)
    authors: [] (An array of strings, as there may be more than one author.)
    description: 
    title: String
    image: String
    link: String
}

 type Auth {
    token: ID!
    User: User
}   

input BookInput {
    bookId: String!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

type Query {
    me: Which returns a User type.
 }

 type Mutation {
    login: (email: String!, password: String!): Auth (Accepts an email and password as parameters; returns an Auth type.)
    addUser: (username: String!): User (Accepts a username, email, and password as parameters; returns an Auth type.)
    saveBook: [book author] (Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a User type. Look into creating what's known as an input type to handle all of these parameters!)
    removeBook: _bookId (Accepts a book's bookId as a parameter; returns a User type.)
};

module.exports = typeDefs;
