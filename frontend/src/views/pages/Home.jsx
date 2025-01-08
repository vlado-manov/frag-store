import React from "react";
import { useGetProductsQuery } from "../../slices/productSlice";
import ProductCard from "../../components/ProductCard";
import HeaderProductList from "../../components/HeaderProductList";
import Filters from "../../components/Filters";

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;
  return (
    <>
      <div className="flex items-start justify-center gap-10">
        <div className="flex-[9]">
          <HeaderProductList />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
