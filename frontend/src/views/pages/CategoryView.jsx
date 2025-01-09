import React, { useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphql/queries";
import HeaderProductList from "../../components/HeaderProductList";
import Filters from "../../components/Filters";
import Container from "./../../components/layout/Container.jsx";

const CategoryView = () => {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState("variants.price");
  const [sortOrder, setSortOrder] = useState("asc");
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: {
      category,
      sortBy,
      sortOrder,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <Container>
      <HeaderProductList
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
      <div className="flex justify-center">
        <Filters hideFilters={["category"]} />
        <div className="grid grid-cols-1 max-w-max md:max-w-6xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.products?.length > 0 ? (
            data.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default CategoryView;
