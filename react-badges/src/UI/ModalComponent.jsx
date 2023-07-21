import { Box, Modal, Fade, Typography, Backdrop, Button } from "@mui/material";
import { useForm } from "react-hook-form";
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

const ModalComponent = ({
  handleClose,
  textAreaValue,
  getTextAreaValue,
  open,
  onDisapproveClick,
  itemId
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  return (
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
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Add a disapproval motivation
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            <TextArea
              getTextArea={getTextAreaValue}
              textAreaValue={textAreaValue}
              register={register}
            />
            {errors.textAreaValue && <p>This field is required.</p>}
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleSubmit(onDisapproveClick(itemId))}
          >
            Submit
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalComponent;
