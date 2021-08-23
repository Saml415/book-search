import { gql } from "@apollo/client";
export const QUERY_USER = gql`
  query getMe {
    getMe {
      username
      bookCount
      savedBooks {
        bookId
        authors
        title
        description
        image
      }
    }
  }
`;
