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
import { GET_BRANDS, GET_CATEGORIES } from "../graphql/queries";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

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
const Filters = ({ hideFilters = [] }) => {
  const { data: brandsData } = useQuery(GET_BRANDS);
  const { data: categoriesData } = useQuery(GET_CATEGORIES);
  // const { data: sizesData } = useQuery(GET_SIZES);
  const [brandFilter, setBrandFilter] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    gender: true,
    price: true,
    brand: true,
  });
  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setBrandFilter(typeof value === "string" ? value.split(",") : value);
  };
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  return (
    <div className="flex-[3] w-full py-4 px-6 min-w-80 max-w-80 hidden md:block">
      {!hideFilters.includes("category") && (
        <div>
          <p
            className="mb-1 text-sm border-2 border-slate-300  text-black p-2 bg-slate-100 relative"
            onClick={() => toggleSection("category")}
            // style={{
            //     background: "linear-gradient(10deg, #0ea5e9 0%, #6366f1 100%)",
            //   }}
          >
            Category
            <span className="absolute right-2 top-1/2 -translate-y-1/2">
              {expandedSections.category ? (
                <MdOutlineKeyboardArrowUp size={24} color="black" />
              ) : (
                <MdOutlineKeyboardArrowDown size={24} color="black" />
              )}
            </span>
          </p>

          {expandedSections.category && (
            <div className="px-4 flex items-center gap-2 flex-wrap mt-3 mb-4">
              {categoriesData?.categories?.map((category, index) => (
                <FormControlLabel
                  key={index}
                  control={<Checkbox defaultChecked />}
                  label={category.charAt(0).toUpperCase() + category.slice(1)}
                />
              ))}
            </div>
          )}
        </div>
      )}
      <div>
        <p
          className="mb-1 text-sm border-2 border-slate-300  text-black p-2 bg-slate-100 relative"
          onClick={() => toggleSection("gender")}

          // style={{
          //   background: "linear-gradient(10deg, #0ea5e9 0%, #6366f1 100%)",
          // }}
        >
          Gender
          <span className="absolute right-2 top-1/2 -translate-y-1/2">
            {expandedSections.gender ? (
              <MdOutlineKeyboardArrowUp size={24} color="black" />
            ) : (
              <MdOutlineKeyboardArrowDown size={24} color="black" />
            )}
          </span>
        </p>
        {expandedSections.gender && (
          <div className="px-4 mt-3 mb-4 flex items-center gap-2 flex-wrap">
            {["Male", "Female", "Unisex"].map((gender) => (
              <FormControlLabel
                key={gender}
                control={<Checkbox defaultChecked />}
                label={gender}
              />
            ))}
          </div>
        )}
      </div>
      <div>
        <p
          className="mb-1 text-sm border-2 border-slate-300  text-black p-2 bg-slate-100 relative"
          onClick={() => toggleSection("price")}
          // style={{
          //   background: "linear-gradient(10deg, #0ea5e9 0%, #6366f1 100%)",
          // }}
        >
          Price
          <span className="absolute right-2 top-1/2 -translate-y-1/2">
            {expandedSections.price ? (
              <MdOutlineKeyboardArrowUp size={24} color="black" />
            ) : (
              <MdOutlineKeyboardArrowDown size={24} color="black" />
            )}
          </span>
        </p>
        {expandedSections.price && (
          <div className="flex items-center justify-between gap-4 mt-5 mb-4">
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
        )}
      </div>
      {!hideFilters.includes("brand") && (
        <div>
          <p
            className="mb-1 text-sm border-2 border-slate-300  text-black p-2 bg-slate-100 relative"
            onClick={() => toggleSection("brand")}
            // style={{
            //     background: "linear-gradient(10deg, #0ea5e9 0%, #6366f1 100%)",
            //   }}
          >
            Brand
            <span className="absolute right-2 top-1/2 -translate-y-1/2">
              {expandedSections.brand ? (
                <MdOutlineKeyboardArrowUp size={24} color="black" />
              ) : (
                <MdOutlineKeyboardArrowDown size={24} color="black" />
              )}
            </span>
          </p>
          {expandedSections.brand && (
            <div className="flex gap-5 items-center flex-wrap w-full mt-5 mb-4">
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
                  {brandsData?.brands
                    ?.slice()
                    .sort((a, b) => a.localeCompare(b))
                    .map((brand, index) => (
                      <MenuItem key={index} value={brand}>
                        <Checkbox checked={brandFilter.includes(brand)} />
                        <ListItemText primary={brand} />
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
          )}
        </div>
      )}
      {/* <div className="py-4">
        <p
            className="mb-4 text-sm border-2 border-slate-300  text-black p-2 bg-slate-100"
          // style={{
          //   background: "linear-gradient(10deg, #0ea5e9 0%, #6366f1 100%)",
          // }}
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
      </div> */}
      <button className="bg-black text-white hover:bg-gray-900 py-2 px-4 w-full block mb-2 mt-6">
        Search
      </button>
      <button className="bg-slate-200 text-black hover:bg-slate-300 py-2 px-4 w-full block">
        Clear search filters
      </button>
    </div>
  );
};

export default Filters;
