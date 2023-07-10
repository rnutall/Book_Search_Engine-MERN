import { gql } from '@apollo/client';

export const login = gql`
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

  export const addUser = gq`
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

  export const saveBook =gql`
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

  
export const removeBook = gql`
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
