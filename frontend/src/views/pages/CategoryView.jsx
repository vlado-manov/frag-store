import React, { useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphql/queries";
import HeaderProductList from "../../components/HeaderProductList";

const CategoryView = () => {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const currentSort =
    sortBy === "variants.price" && sortOrder === "asc"
      ? "lowToHigh"
      : sortBy === "variants.price" && sortOrder === "desc"
      ? "highToLow"
      : sortBy === "createdAt" && sortOrder === "desc"
      ? "newest"
      : sortBy === "numReviews" && sortOrder === "desc"
      ? "reviews"
      : sortBy === "rating" && sortOrder === "desc"
      ? "rating"
      : "";
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { category, sortBy, sortOrder },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="py-12">
      <h1>Product List</h1>
      <HeaderProductList
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
        currentSort={currentSort}
      />
      <div className="flex items-center justify-center">
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
    </div>
  );
};

export default CategoryView;
