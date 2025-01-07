import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const HeaderProductList = ({ setSortBy, setSortOrder, currentSort }) => {
  const [sort, setSort] = useState("");

  useEffect(() => {
    const savedSort = localStorage.getItem("sort");
    if (savedSort) {
      setSort(savedSort);
      handleSortChange({ target: { value: savedSort } }, true);
    }
  }, [setSort]);

  const handleSortChange = (e, isInitialLoad = false) => {
    const value = e.target.value;
    setSort(value);

    if (!isInitialLoad) {
      localStorage.setItem("sort", value);
    }

    if (value === "lowToHigh") {
      setSortBy("variants.price");
      setSortOrder("asc");
    } else if (value === "highToLow") {
      setSortBy("variants.price");
      setSortOrder("desc");
    } else if (value === "newest") {
      setSortBy("createdAt");
      setSortOrder("desc");
    } else if (value === "reviews") {
      setSortBy("numReviews");
      setSortOrder("desc");
    } else if (value === "rating") {
      setSortBy("rating");
      setSortOrder("desc");
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-6 py-4 w-full">
        <div className="flex-[9]">
          <Stack spacing={2}>
            <Pagination count={10} showFirstButton showLastButton />
          </Stack>
        </div>
        <div className="flex-[3]">
          <FormControl fullWidth size="small">
            <InputLabel id="sort-label">Sort by...</InputLabel>
            <Select
              labelId="sort-label"
              id="sort-select"
              value={sort}
              onChange={handleSortChange}
            >
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
