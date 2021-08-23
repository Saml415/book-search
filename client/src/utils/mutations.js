import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation signupUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
      }
    }
  }
`;
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        password
      }
    }
  }
`;
export const SAVE_BOOK = gql`
  mutation saveBook($book: addBook!) {
    saveBook(book: $book) {
      username
      savedBooks {
        bookId
      }
    }
  }
`;
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      username
      bookCount
      savedBooks {
        bookId
        authors
        descriptions
        title
        image
      }
    }
  }
`;
