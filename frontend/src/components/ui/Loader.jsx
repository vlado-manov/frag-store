import React from "react";
import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <CircularProgress
        size={160}
        color="secondary"
        sx={{ margin: "auto", display: "block" }}
      ></CircularProgress>
    </div>
  );
};

export default Loader;
