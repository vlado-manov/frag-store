import React, { useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useParams } from "react-router-dom";
import { GET_PRODUCTS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import HeaderProductList from "../../components/HeaderProductList";
import Filters from "../../components/Filters";

const BrandView = () => {
  const { brand } = useParams();
  const [sortBy, setSortBy] = useState("variants.price");
  const [sortOrder, setSortOrder] = useState("asc");

  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { brand_slug: brand, sortBy, sortOrder },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="py-12">
      <h1>Product List</h1>
      <HeaderProductList
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
      <div className="flex justify-center">
        <Filters hideFilters={["brand", "category"]} />
        <div className="grid grid-cols-1 max-w-max md:max-w-6xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.products?.length > 0 ? (
            data.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p>No products found for this brand.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandView;
