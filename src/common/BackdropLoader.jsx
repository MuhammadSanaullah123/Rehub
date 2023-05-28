import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

import Box from "@mui/material/Box";

function BackdropLoader() {
  return (
    <Box
      height="100vh"
      width="100vw"
      zIndex="1400"
      position="fixed"
      bgcolor="#ffffffe0"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress size="6rem" style={{ color: "grey" }} />
    </Box>
  );
}

export default BackdropLoader;
