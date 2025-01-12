import React from "react";
import Settings from "./Settings";
import { GET_PRODUCTS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import WishListProductCard from "../../components/WishListProductCard";

const WishList = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {});
  console.log(data);
  return (
    <Settings>
      <h1 className="text-2xl font-bold text-left my-1">Wishlist</h1>
      <p className="text-gray-600 text-sm text-left font-thin">
        Save your favorite products and easily access them anytime.
      </p>
      <div className="border-slate-100 bg-stone-50 border-2 p-6 rounded-xl w-full mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.products.slice(0, 10).map((product) => (
            <WishListProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </Settings>
  );
};

export default WishList;
