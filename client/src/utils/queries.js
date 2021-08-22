import { gql } from "@apollo/client";
export const QUERY_USER = gql`
  query getMe {
    getMe {
      username
      bookCount
      savedBooks {
        _id
        authors
        title
        description
        image
      }
    }
  }
`;
