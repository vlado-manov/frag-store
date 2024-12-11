import React from "react";
import Loader from "../../components/ui/Loader";
import Message from "../../components/ui/Message";
import { Box } from "@mui/material";

const OrdersList = () => {
  return (
    <>
      <Loader />
      <Box sx={{ padding: 3 }}>
        <Message severity="error" variant="outlined">
          This is an alert message
        </Message>
        <hr />
        <Message severity="error" variant="standard">
          This is an alert message
        </Message>
        <hr />
        <Message severity="warning" variant="outlined">
          This is a warning message
        </Message>
        <hr />
        <Message severity="info" variant="outlined">
          This is an info message
        </Message>
        <hr />
        <Message severity="success" variant="outlined">
          This is a success message
        </Message>
        <hr />
        <Message severity="success" variant="filled">
          This is a success message
        </Message>
        <hr />
        <Message severity="success" variant="standard">
          This is a success message
        </Message>
      </Box>
      <div style={{ height: "100vh" }}>OrdersList</div>;
    </>
  );
};

export default OrdersList;
