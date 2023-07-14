import React, { useContext } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { AuthContext } from "./state/with-auth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

const GET_CANDIDATURE_PROPOSALS_BY_ENGINEERS = gql`
  query MyQuery {
    engineer_to_manager_badge_candidature_proposals {
      id
      created_by
      badge_version
      manager
      proposal_description
      badges_version {
        title
      }
      user {
        name
      }
      userByManager {
        name
      }
    }
  }
`;

const UPDATE_ENGINEER_CANDIDATURE_PROPOSAL_BY_MANAGER = gql`
  mutation managerProposalResponse(
    $response_id: Int!
    $is_approved: Boolean!
    $dissaproval_motivation: String!
    $proposal_id: Int!
  ) {
    update_manager_badge_candidature_proposal_response(
      where: { response_id: { _eq: $response_id } }
      _set: {
        is_approved: $is_approved
        disapproval_motivation: $dissaproval_motivation
      }
    ) {
      returning {
        is_approved
        disapproval_motivation
        proposal_id
        response_id
        created_by
        created_at
      }
    }
  }
`;

const CandidatureProposals = () => {
  const { managerId } = useContext(AuthContext);
  const { loading, error, data } = useQuery(
    GET_CANDIDATURE_PROPOSALS_BY_ENGINEERS
  );

  const [updateResponse, { data: data2, loading: loading2, error: error2 }] =
    useMutation(UPDATE_ENGINEER_CANDIDATURE_PROPOSAL_BY_MANAGER);
  console.log(data2);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...{error}</div>;
  }
  console.log(data);
  const candidatures = data.engineer_to_manager_badge_candidature_proposals;
  console.log(data.engineer_to_manager_badge_candidature_proposals);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Engineer who applied</TableCell>
            <TableCell align="right">Badge Version</TableCell>
            <TableCell align="right">Badge Title</TableCell>
            <TableCell align="right">Proposal Description</TableCell>
            <TableCell align="right">Manager</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidatures.map(
            (item) =>
              item.manager === parseInt(managerId) && (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.user.name}
                  </TableCell>
                  <TableCell align="right">{item.badge_version}</TableCell>
                  <TableCell align="right">
                    {item.badges_version.title}
                  </TableCell>
                  <TableCell align="right">
                    {item.proposal_description}
                  </TableCell>
                  <TableCell align="right">{item.userByManager.name}</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" color="success">
                      Approve
                    </Button>
                    <Button variant="contained" color="error">
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CandidatureProposals;
