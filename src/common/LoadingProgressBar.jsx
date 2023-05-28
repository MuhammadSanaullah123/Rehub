import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import Box from "@mui/material/Box";

function LoadingProgressBar() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <CircularProgress size="2rem" style={{ color: "grey" }} />
    </Box>
  );
}

export default LoadingProgressBar;
