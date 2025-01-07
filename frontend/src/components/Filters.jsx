import { useQuery } from "@apollo/client";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { GET_SIZES, GET_BRANDS, GET_CATEGORIES } from "../graphql/queries";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const Filters = () => {
  const { data: brandsData } = useQuery(GET_BRANDS);
  const { data: categoriesData } = useQuery(GET_CATEGORIES);
  const { data: sizesData } = useQuery(GET_SIZES);
  const [brandFilter, setBrandFilter] = useState([]);
  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setBrandFilter(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <div className="flex-[3] py-4 px-6">
      <div className="">
        <p
          className="mb-4 text-sm border-gray-400  text-white p-2"
          style={{
            background: "linear-gradient(10deg, #0ea5e9 0%, #6366f1 100%)",
          }}
        >
          Category
        </p>
        <div className="px-4 flex items-center gap-4">
          {categoriesData?.categories?.map((category, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox defaultChecked />}
              label={category.charAt(0).toUpperCase() + category.slice(1)}
            />
          ))}
        </div>
      </div>
      <div className="py-4">
        <p
          className="mb-4 text-sm border-gray-400  text-white p-2"
          style={{
            background: "linear-gradient(10deg, #0ea5e9 0%, #6366f1 100%)",
          }}
        >
          Gender
        </p>
        <div className="px-4 flex items-center gap-4">
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Male"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Female"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Unisex"
          />
        </div>
      </div>
      <div className="py-4">
        <p
          className="mb-4 text-sm border-gray-400  text-white p-2"
          style={{
            background: "linear-gradient(10deg, #0ea5e9 0%, #6366f1 100%)",
          }}
        >
          Price
        </p>
        <div className="flex items-center justify-between gap-4">
          <FormControl fullWidth size="small">
            <InputLabel htmlFor="outlined-adornment-amount">Min</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
            />
          </FormControl>
          <span>-</span>
          <FormControl fullWidth size="small">
            <InputLabel htmlFor="outlined-adornment-amount">Max</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
            />
          </FormControl>
        </div>
      </div>
      <div className="py-4">
        <p
          className="mb-4 text-sm border-gray-400  text-white p-2"
          style={{
            background: "linear-gradient(10deg, #0ea5e9 0%, #6366f1 100%)",
          }}
        >
          Brand
        </p>
        <div className="flex gap-5 items-center flex-wrap w-full">
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Brand</InputLabel>
            <Select
              multiple
              value={brandFilter}
              onChange={handleChange}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Placeholder</em>;
                }

                return selected.join(", ");
              }}
              MenuProps={MenuProps}
            >
              {brandsData?.brands?.map((brand, index) => (
                <MenuItem key={index} value={brand}>
                  <Checkbox checked={brandFilter.includes(brand)} />
                  <ListItemText primary={brand} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="py-4">
        <p
          className="mb-4 text-sm border-gray-400  text-white p-2"
          style={{
            background: "linear-gradient(10deg, #0ea5e9 0%, #6366f1 100%)",
          }}
        >
          Sizes
        </p>
        <div className="px-4 flex items-center gap-4 flex-wrap">
          {sizesData?.sizes?.map((size, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox defaultChecked />}
              label={`${size}ml`}
            />
          ))}
        </div>
      </div>
      <button className=" bg-gray-200 text-black rounded py-2 px-4 w-full block mb-2 mt-6 font-bold">
        Search
      </button>
      <button className=" bg-black text-white rounded py-2 px-4 w-full block">
        Clear search filters
      </button>
    </div>
  );
};

export default Filters;
