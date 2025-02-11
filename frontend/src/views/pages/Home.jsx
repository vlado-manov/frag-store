import React from "react";
import ProductsLayout from "./Products";
import MainCarousel from "../../components/MainCarousel";
import BrandCarousel from "../../components/BrandCarousel";

const Home = () => {
  return (
    <>
      <MainCarousel />
      {/* <BrandCarousel /> */}
      <ProductsLayout title="Top Sellers" showFilters={false} />
    </>
  );
};

export default Home;
