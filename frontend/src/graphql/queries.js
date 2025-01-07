import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts(
    $category: String
    $brand_slug: String
    $minPrice: Float
    $maxPrice: Float
    $maxSize: Int
    $sortBy: String
    $sortOrder: String
  ) {
    products(
      category: $category
      brand_slug: $brand_slug
      minPrice: $minPrice
      maxPrice: $maxPrice
      maxSize: $maxSize
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      _id
      name
      brand
      brand_slug
      category
      gender
      rating
      variants {
        size
        price
        discountPrice
        images
      }
    }
  }
`;

export const GET_TOP_BRANDS = gql`
  query GetTopBrands {
    topBrands
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories
  }
`;

export const GET_BRANDS = gql`
  query GetBrands {
    brands
  }
`;
export const GET_SIZES = gql`
  query GetSizes {
    sizes
  }
`;
