import React from "react";
import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <CircularProgress
      size={100}
      color="secondary"
      sx={{ margin: "auto", display: "block" }}
    ></CircularProgress>
  );
};

export default Loader;
