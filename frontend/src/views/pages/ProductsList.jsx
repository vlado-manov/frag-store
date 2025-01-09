import React, { useState } from "react";
import { useGetProductsQuery } from "../../slices/productSlice";
import ProductCard from "../../components/ProductCard";
import Filters from "../../components/Filters";
import HeaderProductList from "../../components/HeaderProductList";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphql/queries";
import Container from "./../../components/layout/Container.jsx";

const ProductsList = () => {
  const [sortBy, setSortBy] = useState("variants.price");
  const [sortOrder, setSortOrder] = useState("asc");

  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { sortBy, sortOrder },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <Container>
      <HeaderProductList
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
      <div className="flex justify-center">
        <Filters />
        <div className="grid max-w-max md:max-w-6xl sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.products?.length > 0 ? (
            data.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p>No products found for this brand.</p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ProductsList;
