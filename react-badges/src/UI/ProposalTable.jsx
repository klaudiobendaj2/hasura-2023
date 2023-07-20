import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Backdrop,
  Box,
  Modal,
  Fade,
  Typography
} from "@mui/material";
import TextArea from "./TextArea";

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

const ProposalTable = ({
  showPendingProposals,
  pendingProposals,
  managerId,
  handleOpen,
  handleClose,
  textAreaValue,
  getTextAreaValue,
  open,
  candidatures,
  onApproveClick,
  onDisapproveClick
}) => {
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
            <TableCell
              align="right"
              style={{ display: showPendingProposals ? "block" : "none" }}
            >
              Actions
            </TableCell>
            <TableCell
              align="right"
              style={{ display: showPendingProposals ? "none" : "block" }}
            >
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showPendingProposals &&
            pendingProposals.map(
              (item) =>
                item.userByManager.id === parseInt(managerId) && (
                  <TableRow
                    key={item.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 }
                    }}
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
          {!showPendingProposals &&
            candidatures.map(
              (item, index) =>
                item.manager === parseInt(managerId) && (
                  <TableRow
                    key={item.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 }
                    }}
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
                      {item.manager_badge_candidature_proposal_responses
                        .length > 0 &&
                        (item.manager_badge_candidature_proposal_responses[0]
                          .is_approved
                          ? "Proposal approved"
                          : "Proposal rejected")}
                    </TableCell>
                  </TableRow>
                )
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ProposalTable;
