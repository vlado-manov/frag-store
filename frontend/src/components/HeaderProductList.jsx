import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const HeaderProductList = ({ setSortBy, setSortOrder, sortBy, sortOrder }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (sortBy === "variants.price" && sortOrder === "asc") {
      setValue("lowToHigh");
    } else if (sortBy === "variants.price" && sortOrder === "desc") {
      setValue("highToLow");
    } else if (sortBy === "createdAt" && sortOrder === "desc") {
      setValue("newest");
    } else if (sortBy === "numReviews" && sortOrder === "desc") {
      setValue("reviews");
    } else if (sortBy === "rating" && sortOrder === "desc") {
      setValue("rating");
    }
  }, [sortBy, sortOrder]);

  const handleSortChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "lowToHigh") {
      setSortBy("variants.price");
      setSortOrder("asc");
    } else if (selectedValue === "highToLow") {
      setSortBy("variants.price");
      setSortOrder("desc");
    } else if (selectedValue === "newest") {
      setSortBy("createdAt");
      setSortOrder("desc");
    } else if (selectedValue === "reviews") {
      setSortBy("numReviews");
      setSortOrder("desc");
    } else if (selectedValue === "rating") {
      setSortBy("rating");
      setSortOrder("desc");
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-6 p-4 w-full">
        <div className="flex-[9]">
          <Stack spacing={2}>
            <Pagination count={10} showFirstButton showLastButton />
          </Stack>
        </div>
        <div className="flex-[3]">
          <FormControl fullWidth size="small">
            <InputLabel>Sort by...</InputLabel>
            <Select id="sort-select" value={value} onChange={handleSortChange}>
              <MenuItem value="lowToHigh">Price (Low to High)</MenuItem>
              <MenuItem value="highToLow">Price (High to Low)</MenuItem>
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="reviews">Number of Reviews</MenuItem>
              <MenuItem value="rating">Highest Rating</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default HeaderProductList;
