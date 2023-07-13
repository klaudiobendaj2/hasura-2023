import { gql } from "@apollo/client";

export const GET_BADGES_VERSIONS = gql`
  query GetLatestBadgesVersion {
    badges_versions_last {
      id
      created_at
      title
    }
  }
`;