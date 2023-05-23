import React from "react";

// @mui/material
import { RadioGroup as RadioGroupMUI } from "@mui/material";

function RadioGroup(props) {
  return <RadioGroupMUI {...props}>{props?.children}</RadioGroupMUI>;
}

export default RadioGroup;
