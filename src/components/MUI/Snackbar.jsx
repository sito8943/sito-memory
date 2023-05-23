import React from "react";

// @mui/material
import { Snackbar as SnackbarMUI } from "@mui/material";

function Snackbar(props) {
  return <SnackbarMUI {...props}>{props?.children}</SnackbarMUI>;
}

export default Snackbar;
