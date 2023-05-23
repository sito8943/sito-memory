import React from "react";

// @mui/material
import { FormLabel as FormLabelMUI } from "@mui/material";

function FormLabel(props) {
  return <FormLabelMUI {...props}>{props?.children}</FormLabelMUI>;
}

export default FormLabel;
