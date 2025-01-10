import React from "react";
import { useParams } from "react-router-dom";
import ProductsLayout from "./Products";

const CategoryView = () => {
  const { category } = useParams();
  const title = `${
    category.charAt(0).toUpperCase() + category.slice(1)
  } Fragrances`;

  return (
    <ProductsLayout
      title={title}
      queryVariables={{ category }}
      hideFilters={["category"]}
    />
  );
};

export default CategoryView;
