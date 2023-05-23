import React from "react";

// @mui/material
import { FormControl as FormControlMUI } from "@mui/material";

function FormControl(props) {
  return <FormControlMUI {...props}>{props?.children}</FormControlMUI>;
}

export default FormControl;
