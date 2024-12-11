import React from "react";
import { Alert } from "@mui/material";

interface MessageProps {
  severity?: "error" | "warning" | "info" | "success";
  variant?: "standard" | "filled" | "outlined";
  children: React.ReactNode;
}

const Message: React.FC<MessageProps> = ({
  severity = "info",
  variant = "filled",
  children,
}) => {
  return (
    <Alert severity={severity} variant={variant}>
      {children}
    </Alert>
  );
};

export default Message;
