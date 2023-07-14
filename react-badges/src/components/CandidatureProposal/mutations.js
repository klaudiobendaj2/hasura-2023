import { gql } from "@apollo/client";

export const GET_ENGINEERS = gql`
  mutation GetEngineersByManager($managerId: Int!) {
    get_engineers_by_manager(args: { manager_id: $managerId }) {
      name
      roles
      id
    }
  }
`;

export const INSERT_CANDIDATURE_PROPOSAL = gql`
  mutation AddCandidatureProposal($badgeId: Int!, $badgeVersion: timestamp!, $engineer: Int!, $proposalDescription: String!, $createdBy: Int!) {
    insert_manager_to_engineer_badge_candidature_proposals(objects: {
      badge_id: $badgeId,
      badge_version: $badgeVersion,
      engineer: $engineer,
      proposal_description: $proposalDescription,
      created_by: $createdBy
    }) {
      returning {
        badge_id
        badge_version
        engineer
        proposal_description
        created_by
      }
    }
  }
`;



