import React, { useContext, useEffect, useState } from "react";
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
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextArea from "./UI/TextArea";

const GET_CANDIDATURE_PROPOSALS_BY_ENGINEERS = gql`
  query MyQuery($isApproved: Boolean!) {
    engineer_to_manager_badge_candidature_proposals(
      where: {
        manager_badge_candidature_proposal_responses: {
          is_approved: { _eq: $isApproved }
        }
      }
    ) {
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
      manager_badge_candidature_proposal_responses {
        response_id
      }
    }
  }
`;

const APPROVE_ENGINEER_CANDIDATURE_PROPOSAL_BY_MANAGER = gql`
  mutation managerProposalResponse(
    $is_approved: Boolean!
    $disapproval_motivation: String!
    $proposal_id: Int!
  ) {
    update_manager_badge_candidature_proposal_response(
      where: { proposal_id: { _eq: $proposal_id } }
      _set: {
        is_approved: $is_approved
        disapproval_motivation: $disapproval_motivation
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

const DISAPPROVE_ENGINEER_CANDIDATURE_PROPOSAL_BY_MANAGER = gql`
  mutation managerProposalResponse(
    $is_approved: Boolean!
    $disapproval_motivation: String!
    $proposal_id: Int!
  ) {
    update_manager_badge_candidature_proposal_response(
      where: { proposal_id: { _eq: $proposal_id } }
      _set: {
        is_approved: $is_approved
        disapproval_motivation: $disapproval_motivation
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const CandidatureProposals = () => {
  const [open, setOpen] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [isApprovedFilter, setIsApprovedFilter] = useState(true);

  const { managerId } = useContext(AuthContext);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { loading, error, data, refetch } = useQuery(
    GET_CANDIDATURE_PROPOSALS_BY_ENGINEERS,
    {
      variables: {
        isApproved: isApprovedFilter
      }
    }
  );

  useEffect(() => {
    refetch({ isApproved: isApprovedFilter });
  }, [isApprovedFilter]);

  const [approveResponse, { data: data2, loading: loading2, error: error2 }] =
    useMutation(APPROVE_ENGINEER_CANDIDATURE_PROPOSAL_BY_MANAGER);

  const [disapproveResponse] = useMutation(
    DISAPPROVE_ENGINEER_CANDIDATURE_PROPOSAL_BY_MANAGER
  );

  const onApproveClick = (proposalId) => {
    approveResponse({
      variables: {
        proposal_id: proposalId,
        is_approved: true,
        disapproval_motivation: "---"
      }
    });
    setTextAreaValue("");
  };

  const onDisapproveClick = (proposalId) => {
    disapproveResponse({
      variables: {
        proposal_id: proposalId,
        is_approved: false,
        disapproval_motivation: textAreaValue
      }
    });
  };

  const getTextAreaValue = (item) => {
    setTextAreaValue(item);
  };

  const handleShowOngoing = () => {
    setIsApprovedFilter(true);
  };

  const handleShowDisapproved = () => {
    setIsApprovedFilter(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...{error}</div>;
  }

  const candidatures = data.engineer_to_manager_badge_candidature_proposals;

  return (
    <>
      <Button onClick={handleShowOngoing}>Show Ongoing</Button>
      <Button onClick={handleShowDisapproved}>Show Disapproved</Button>
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
                    <TableCell align="right">
                      {item.userByManager.name}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => onApproveClick(item.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleOpen}
                      >
                        Reject
                      </Button>
                    </TableCell>
                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      open={open}
                      onClose={handleClose}
                      closeAfterTransition
                      slots={{ backdrop: Backdrop }}
                      slotProps={{
                        backdrop: {
                          timeout: 500
                        }
                      }}
                    >
                      <Fade in={open}>
                        <Box sx={style}>
                          <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                          >
                            Add a disapproval motivation
                          </Typography>
                          <Typography
                            id="transition-modal-description"
                            sx={{ mt: 2 }}
                          >
                            <TextArea
                              getTextArea={getTextAreaValue}
                              textAreaValue={textAreaValue}
                            />
                          </Typography>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => onDisapproveClick(item.id)}
                          >
                            Submit
                          </Button>
                        </Box>
                      </Fade>
                    </Modal>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CandidatureProposals;
