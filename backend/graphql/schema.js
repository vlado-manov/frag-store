import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Variant {
    size: Int
    price: Float
    discountPrice: Float
    countInStock: Int
    images: [String]
    video: String
    onSale: Boolean
  }

  type Product {
    _id: ID
    name: String
    description: String
    brand: String
    brand_slug: String
    category: String
    gender: String
    rating: Float
    numReviews: Int
    variants: [Variant]
  }

  type Query {
    products(
      category: String
      minPrice: Float
      maxPrice: Float
      maxSize: Int
      brand_slug: String
      sortBy: String
      sortOrder: String
    ): [Product]
    categories: [String]
    brands: [String]
    sizes: [Int]
    availableProducts: [Product]
    topBrands: [String]
  }
`;
