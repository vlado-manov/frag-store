import React, { useState } from "react";
import { Product } from "../../types/productTypes";
import { Link, useParams } from "react-router-dom";
import { useGetProductQuery } from "../../slices/productSlice";

const ProductView: React.FC = () => {
  const { id: productId } = useParams<{ id: string | undefined }>();
  const { data: product, error, isLoading } = useGetProductQuery(productId);

  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);

  const selectedVariant = product?.variants[selectedVariantIndex];

  const handleVariantChange = (index: number) => {
    setSelectedVariantIndex(index);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-page">
      <Link to="/" className="btn btn-dark my-3">
        Go Back
      </Link>
      <div className="product-image-container">
        <img
          // src={
          //   selectedVariant?.images?.[0] ||
          //   "https://img.freepik.com/premium-photo/isolated-perfume-bottle-white-background_875825-38234.jpg"
          // }
          src="https://img.freepik.com/premium-photo/isolated-perfume-bottle-white-background_875825-38234.jpg"
          alt={product.name}
          className="product-image"
          style={{ width: "250px", height: "250px" }}
        />
      </div>
      <div className="product-details">
        <h1>
          {product.name} - {selectedVariant?.size}
        </h1>
        <p className="product-brand">Brand: {product.brand}</p>
        <p className="product-brand">Gender: {product.gender}</p>
        <p className="product-description">{product.description}</p>

        {product.variants.length > 1 && (
          <div className="variant-selection">
            <h3>Select Size:</h3>
            {product.variants.map((variant, index) => (
              <label key={variant.size} className="variant-label">
                <input
                  type="radio"
                  name="variant"
                  value={variant.size}
                  checked={selectedVariantIndex === index}
                  onChange={() => handleVariantChange(index)}
                />
                {variant.size}
              </label>
            ))}
          </div>
        )}

        <div className="product-price">
          <span>${selectedVariant?.price?.toFixed(2)}</span>
        </div>
        <div className="product-stock">
          <p>
            {selectedVariant?.countInStock ?? 0 > 0
              ? `Currently in stock: ${selectedVariant?.countInStock}`
              : "Out of Stock"}
          </p>
        </div>
        <button
          className="add-to-cart-btn"
          disabled={selectedVariant?.countInStock === 0}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductView;
