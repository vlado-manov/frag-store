import React from "react";
import { Alert } from "@mui/material";

interface MessageProps {
  severity: "error" | "info" | "warning" | "success";
  children: React.ReactNode;
  variant?: "filled" | "outlined" | "standard";
}

const Message: React.FC<MessageProps> = ({
  severity,
  children,
  variant = "outlined",
}) => {
  return (
    <Alert severity={severity} variant={variant}>
      {children}
    </Alert>
  );
};

export default Message;
