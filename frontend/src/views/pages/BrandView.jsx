import React from "react";
import ProductCard from "../../components/ProductCard";
import { useParams } from "react-router-dom";
import { GET_PRODUCTS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";

const BrandView = () => {
  const { brand } = useParams();
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { brand_slug: brand },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="py-12">
      <h1>Product List</h1>
      <div className="flex items-center justify-center">
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
