import {gql} from '@apollo/client';

    export const Query = gql`
    me {
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