import React from "react";
import { Alert } from "@mui/material";

// severity: "error" | "info" | "warning" | "success";
// variant?: "filled" | "outlined" | "standard";

const Message = ({ severity, children, variant = "standard", sx }) => {
  return (
    <Alert severity={severity} variant={variant} sx={sx}>
      {children}
    </Alert>
  );
};

export default Message;
