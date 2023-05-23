import React from "react";

// @mui/material
import { Alert as AlertMUI } from "@mui/material";

function Alert(props) {
  return <AlertMUI {...props}>{props?.children}</AlertMUI>;
}

export default Alert;
