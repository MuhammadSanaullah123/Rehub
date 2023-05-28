import React, { useState } from "react";

//mui
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
//other
import { SketchPicker } from "react-color";

function ColorPicker({ open, handleClose, setPrimaryColor }) {
  const [color, setColor] = useState();

  const handleChangeComplete = (color) => {
    setColor(color.hex);
    setPrimaryColor(color.hex);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    height: "310px",
    background: "#FFFFFF",
    borderRadius: "9px",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
      </Box>
    </Modal>
  );
}

export default ReviewModal;
