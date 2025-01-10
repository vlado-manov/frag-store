import React from "react";
import { useParams } from "react-router-dom";
import ProductsLayout from "./Products";

const BrandView = () => {
  const { brand } = useParams();
  const title = `By ${brand.charAt(0).toUpperCase() + brand.slice(1)}`;

  return (
    <ProductsLayout
      title={title}
      queryVariables={{ brand_slug: brand }}
      hideFilters={["brand", "category"]}
    />
  );
};

export default BrandView;
