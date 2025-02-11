import React from "react";
import { Drawer } from "@mui/material";
import { Link } from "react-router-dom";
import { GET_CATEGORIES, GET_TOP_BRANDS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
const CustomDrawer = ({ drawerOpen, toggleDrawer }) => {
  const { data: categoriesData } = useQuery(GET_CATEGORIES);
  const { data: topBrandsData } = useQuery(GET_TOP_BRANDS);
  return (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      sx={{
        width: 300,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 300,
          backgroundColor: "#fff",
          color: "#000",
          transition: "transform 0.3s ease-in-out",
        },
      }}
    >
      <div className="px-5 py-10">
        <h2 className="text-lg text-black uppercase">Categories</h2>
        <hr className="border-gray-400 my-1" />
        <div className="p-2 flex flex-col">
          {categoriesData?.categories?.map((category, index) => (
            <Link
              key={index}
              to={`/products/categories/${category}`}
              onClick={toggleDrawer(false)}
            >
              <p className="py-1 capitalize hover:text-gray-700">
                - {category}
              </p>
            </Link>
          ))}
          <h2 className="text-lg text-black uppercase mt-5">For</h2>
          <hr className="border-gray-400 my-1" />
          <Link
            to={`/products/categories/designer`}
            onClick={toggleDrawer(false)}
          >
            <p className="py-1 hover:text-gray-700">- Male</p>
          </Link>
          <Link to={`/products/categories/niche`} onClick={toggleDrawer(false)}>
            <p className="py-1 hover:text-gray-700">- Female</p>
          </Link>
          <Link
            to={`/products/categories/arabic`}
            onClick={toggleDrawer(false)}
          >
            <p className="py-1 hover:text-gray-700">- Unisex</p>
          </Link>
          <h2 className="text-lg text-black uppercase mt-5">Top brands</h2>
          <hr className="border-gray-400 my-1" />
          {topBrandsData?.topBrands?.map((topBrand, index) => (
            <Link
              key={index}
              onClick={toggleDrawer(false)}
              to={`/products/brands/${topBrand
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9\s-]/gi, "")
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
            >
              <p key={index} className="py-1 hover:text-gray-700">
                - {topBrand}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default CustomDrawer;
