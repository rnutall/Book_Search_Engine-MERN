import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }`;

  export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }`;

  export const SAVE_BOOK =gql`
  mutation saveBook( $input: BookInput) {
    saveBook( input: $input) {
      _id
      username
      email
      bookCount
      savedBooks {
        title
        link
        image
        description
        bookId
        authors
      }
    }
  }`;

  
export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      email
      username
      bookCount
      savedBooks {
        title
        link
        image
        description
        bookId
        authors
      }
    }
  }`;
