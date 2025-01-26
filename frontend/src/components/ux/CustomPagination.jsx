import { Pagination, Stack } from "@mui/material";
import React from "react";

const CustomPagination = ({ pages, page, setPage }) => {
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <div className="my-6 w-full flex justify-center">
      <Stack spacing={2}>
        <Pagination
          count={pages}
          page={page}
          onChange={handleChange}
          siblingCount={0}
          boundaryCount={1}
          showFirstButton
          showLastButton
        />
      </Stack>
    </div>
  );
};

export default CustomPagination;
