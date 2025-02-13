import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphql/queries";
import ProductCard from "../../components/ProductCard";
import HeaderProductList from "../../components/HeaderProductList";
import Filters from "../../components/Filters";
import Container from "../../components/layout/Container.jsx";

const ProductsLayout = ({
  title,
  queryVariables = {},
  hideFilters = [],
  showFilters = true,
}) => {
  const [sortBy, setSortBy] = useState("variants.price");
  const [sortOrder, setSortOrder] = useState("asc");

  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { ...queryVariables, sortBy, sortOrder },
  });

  if (loading)
    return (
      <div className="flex justify-center w-full my-6">
        <div className="w-full max-w-xl md:max-w-6xl px-4">
          <div className="w-full bg-slate-200 rounded animate-pulse h-16"></div>
          <div className="w-full bg-slate-200 rounded animate-pulse h-12 my-4"></div>
          <div className="flex justify-center gap-4">
            {showFilters && (
              <div className="flex-[3] w-full min-w-80 max-w-80 hidden md:block bg-slate-200 animate-pulse h-96"></div>
            )}
            <div className="w-full bg-slate-200 animate-pulse h-96"></div>
          </div>
        </div>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container>
      <div className="heading-container pb-2 m-4">
        <h1 className="text-lg font-roboto uppercase py-4 bg-white m-0">
          {title}
        </h1>
      </div>
      <HeaderProductList
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
      <div className="flex justify-center">
        {showFilters && <Filters hideFilters={hideFilters} />}
        <div className="grid grid-cols-2 max-w-max md:max-w-6xl md:grid-cols-3 lg:grid-cols-4 gap-6">
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

export default ProductsLayout;
