import React from "react";
import ProductsLayout from "./Products";
import PromoHome from "../../components/PromoHome";

const Home = () => (
  <>
    <PromoHome />
    <ProductsLayout title="Top Sellers" showFilters={false} />
  </>
);

export default Home;
