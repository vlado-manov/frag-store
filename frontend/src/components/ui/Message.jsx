import React from "react";
import { Alert } from "@mui/material";

// severity: "error" | "info" | "warning" | "success";
// variant?: "filled" | "outlined" | "standard";

const Message = ({ severity, children, variant = "standard" }) => {
  return (
    <Alert severity={severity} variant={variant}>
      {children}
    </Alert>
  );
};

export default Message;
