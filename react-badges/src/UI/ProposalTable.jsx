import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from "@mui/material";
import ModalComponent from "./ModalComponent";
import ButtonComponent from "../UI/ButtonComponent";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import TableRowComponent from "./TableRowComponent";

const ProposalTable = ({
  showPendingProposals,
  pendingProposals,
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
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Applicants</TableCell>
              <TableCell align="right">Badge Version</TableCell>
              <TableCell align="right">Badge Title</TableCell>
              <TableCell align="right">Proposal Description</TableCell>
              <TableCell align={showPendingProposals ? "center" : "right"}>
                {showPendingProposals ? "Actions" : "Status"}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showPendingProposals &&
              pendingProposals.map((item) => (
                <TableRowComponent
                  key={item.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 }
                  }}
                  component="th"
                  scope="row"
                  align="right"
                  item={item}
                  additionalCell={
                    <>
                      <TableCell align="right">
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <ButtonComponent
                            variant="contained"
                            color="success"
                            handleClick={() => onApproveClick(item.id)}
                            content={<DoneOutlinedIcon />}
                            sx={{ marginRight: "10px" }}
                          />
                          <ButtonComponent
                            variant="contained"
                            color="error"
                            handleClick={() => handleOpen(item.id)}
                            content={<CloseOutlinedIcon />}
                          />
                        </Box>
                      </TableCell>
                      <ModalComponent
                        handleClose={handleClose}
                        textAreaValue={textAreaValue}
                        getTextAreaValue={getTextAreaValue}
                        open={open}
                        onDisapproveClick={onDisapproveClick}
                        itemId={item.id}
                      />
                    </>
                  }
                />
              ))}
            {!showPendingProposals &&
              candidatures.map((item) => (
                <TableRowComponent
                  key={item.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 }
                  }}
                  component="th"
                  scope="row"
                  align="right"
                  item={item}
                  additionalCell={
                    <TableCell align="right">
                      {item.manager_badge_candidature_proposal_responses.length > 0 &&
                        (item.manager_badge_candidature_proposal_responses[0].is_approved ? "Approved" : "Rejected")}
                    </TableCell>
                  }
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default ProposalTable;
