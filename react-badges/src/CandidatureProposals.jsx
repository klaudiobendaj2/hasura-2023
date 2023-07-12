import React, { useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_CANDIDATURE_PROPOSALS = gql`
  query {
    manager_to_engineer_badge_candidature_proposals {
      badge_version
      created_by
      created_at
      engineer
      id
      proposal_description
      engineer_badge_candidature_proposal_responses {
        disapproval_motivation
        is_approved
      }
    }
  }
`;

const CandidatureProposals = () => {
  const { loading, error, data } = useQuery(GET_CANDIDATURE_PROPOSALS);
  useEffect(() => {
    // if(data){
    console.log(data);
    // }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const candidatures = data.manager_to_engineer_badge_candidature_proposals;
  console.log(candidatures);

  return (
    <>
      <table style={{ border: "1px solid red" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid red" }}>Badge Version</th>
            <th style={{ border: "1px solid red" }}>Engineer</th>
            <th style={{ border: "1px solid red" }}>Proposal Description</th>
            <th style={{ border: "1px solid red" }}>Created By</th>
            <th style={{ border: "1px solid red" }}>Disaproval Motivation</th>
            <th style={{ border: "1px solid red" }}>Is Approved</th>
          </tr>
        </thead>
        <tbody>
          {candidatures.map((item) => (
            <tr key={item.id}>
              <td style={{ border: "1px solid red" }}>{item.badge_version}</td>
              <td style={{ border: "1px solid red" }}>{item.engineer}</td>
              <td style={{ border: "1px solid red" }}>
                {item.proposal_description}
              </td>
              <td style={{ border: "1px solid red" }}>{item.created_by}</td>
              {item.engineer_badge_candidature_proposal_responses.map(
                (item, index) => (
                  <React.Fragment key={index}>
                    <td style={{ border: "1px solid red" }}>
                      {item.disapproval_motivation ? "Yes" : "No"}
                    </td>
                    <td style={{ border: "1px solid red" }}>
                      {item.is_approved ? "Yes" : "No"}
                    </td>
                  </React.Fragment>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CandidatureProposals;
