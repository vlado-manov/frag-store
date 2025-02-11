import { Box, IconButton, InputBase } from "@mui/material";
import React, { useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";

const SearchHeader = ({ scrolled }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchText);
  };

  return (
    <div className="flex items-center flex-[12] sm:flex-[6] w-full pb-2 sm:py-4">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100%",
          "&:focus-within .search-icon": {
            color: "black",
          },
        }}
      >
        <InputBase
          placeholder="Find your product"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          startAdornment={
            <IconButton
              onClick={handleSearch}
              sx={{
                color: `${scrolled ? "white" : "#ededed"}`,
              }}
            >
              <SearchIcon className="search-icon" />
            </IconButton>
          }
          sx={{
            width: "100%",
            padding: "8px 16px",
            background: `${
              scrolled
                ? "rgba(255, 255, 255, 0.1)"
                : "linear-gradient(10deg, rgba(14, 165, 233, 0.4) 0%, rgba(99, 102, 241, 0.45) 50%, rgba(244, 63, 94, 0.35) 100%)"
            }`,
            boxShadow: `${
              scrolled ? "none" : "0px 0px 26px 1px rgba(0,0,0,0.1)"
            }`,
            borderRadius: "4px",
            ".MuiInputBase-input::placeholder": {
              color: "white !important",
              opacity: 0.8,
            },
            "&:focus-within .MuiInputBase-input::placeholder": {
              color: "black !important",
              opacity: 0.8,
            },
            "&:focus-within": {
              background: `${scrolled ? "white" : "#f1f5f9"}`,
              boxShadow: "0px 0px 0px 1px rgba(0,0,0,0.07)",
              color: "#000 !important",
              outline: "none",
            },
            color: "#fff !important",
            maxWidth: "500px",
          }}
        />
      </Box>
    </div>
  );
};

export default SearchHeader;
