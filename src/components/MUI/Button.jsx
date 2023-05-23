import React, { forwardRef } from "react";

// @mui/material
import { Button as ButtonMUI } from "@mui/material";

const Button = forwardRef((props, ref) => {
  return <ButtonMUI {...props}>{props?.children}</ButtonMUI>;
});

export default Button;
