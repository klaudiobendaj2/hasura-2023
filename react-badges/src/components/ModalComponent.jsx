import React from "react";
import { Box, Grid, Modal, Fade, Typography, Backdrop, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import ButtonComponent from "./ButtonComponent";

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

const ModalComponent = ({ handleClose, textAreaValue, getTextAreaValue, open, onDisapproveClick, itemId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onChange"
  });

  console.log(errors);

  const onSubmitClick = (data) => {
    onDisapproveClick(itemId);
  };
  console.log(textAreaValue);

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
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                label="Disapproval Motivation"
                name="motivation"
                value={textAreaValue}
                {...register("motivation", {
                  required: "This field is required!",
                  minLength: {
                    value: 5,
                    message: "It should contain at least 5 characters!"
                  },
                  maxLength: {
                    value: 10,
                    message: "Max 10 characters allowed!"
                  }
                })}
                onChange={(e) => getTextAreaValue(e.target.value)}
                error={!!errors.motivation}
                helperText={errors.motivation?.message}
                multiline
                rows={3}
                sx={{ style: { borderRadius: "8px" } }}
              />
            </Grid>
            <Grid item>
              <ButtonComponent
                type="submit"
                variant="outlined"
                color="success"
                handleClick={handleSubmit(onSubmitClick)}
                content="Submit"
              />
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalComponent;
