import React from "react";

// @mui/material
import { Link as LinkMUI } from "@mui/material";

function Link(props) {
  return <LinkMUI {...props}>{props?.children}</LinkMUI>;
}

export default Link;
