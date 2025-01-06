import React from "react";
import { useGetProductsQuery } from "../../slices/productSlice";
import ProductCard from "../../components/ProductCard";

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div className="product-list-container">
      <h1>Product List</h1>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 max-w-max md:max-w-6xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
