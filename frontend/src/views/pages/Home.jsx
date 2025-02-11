import React from "react";
import ProductsLayout from "./Products";
import MainCarousel from "../../components/MainCarousel";

const Home = () => {
  return (
    <>
      <MainCarousel />
      <ProductsLayout title="Top Sellers" showFilters={false} />
    </>
  );
};

export default Home;
