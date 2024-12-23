import React from "react";
import { useGetProductsQuery } from "../../slices/productSlice";
import { Product } from "../../types/productTypes";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div className="product-list-container">
      <h1>Product List</h1>
      <div className="product-list">
        {products?.map((product: Product) => (
          <div key={product._id} className="product-card">
            <Link to={`/products/${product._id}`}>
              <img
                src={
                  product.variants[0]?.images[0] ||
                  "https://via.placeholder.com/200"
                }
                alt={product.name}
                className="product-image"
              />
            </Link>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-brand">{product.brand}</p>
            <p className="product-price">
              {product.variants[0]?.discountPrice
                ? `$${product.variants[0].discountPrice.toFixed(
                    2
                  )} (Discounted)`
                : product.variants[0]?.price !== undefined
                ? `$${product.variants[0].price.toFixed(2)}`
                : "Price Unavailable"}
            </p>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
