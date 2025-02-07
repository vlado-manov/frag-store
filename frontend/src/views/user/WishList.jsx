import React from "react";
import Settings from "./Settings";
import WishListProductCard from "../../components/WishListProductCard";
import { useSelector } from "react-redux";
import Container from "../../components/layout/Container";
import { useGetWishListProductsQuery } from "../../slices/wishlistApiSlice";
import Loader from "../../components/ux/Loader";

const WishList = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.userInfo);
  const { data: serverWishlist, isLoading } = useGetWishListProductsQuery();
  const localWishlist = useSelector((state) => state.wishlist.items);
  return (
    <>
      {isLoggedIn ? (
        <Settings>
          <h1 className="text-2xl font-bold text-left my-1">Wishlist</h1>
          <p className="text-gray-600 text-sm text-left font-thin">
            Save your favorite products and easily access them anytime.
          </p>
          <div className="border-slate-100 bg-stone-50 border-2 p-6 rounded-xl w-full mt-4">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {serverWishlist.products.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {serverWishlist.products
                      .slice()
                      .reverse()
                      .map((product) => (
                        <WishListProductCard
                          key={product._id}
                          product={product}
                        />
                      ))}
                  </div>
                ) : (
                  <p>No products in your wishlist</p>
                )}
              </>
            )}
          </div>
        </Settings>
      ) : (
        <Container>
          <h1 className="text-lg font-roboto uppercase mx-4 border-b-8 py-4">
            Wishlist
          </h1>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 max-w-max md:max-w-6xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {localWishlist?.length > 0 ? (
                localWishlist
                  .slice()
                  .reverse()
                  .map((product) => (
                    <WishListProductCard key={product._id} product={product} />
                  ))
              ) : (
                <p>No products in your wishlist</p>
              )}
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default WishList;
