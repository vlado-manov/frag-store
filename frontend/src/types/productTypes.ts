export interface Review {
  user: string;
  name: string;
  comment: string;
  rating: number;
  createdAt: string;
}

export interface Variant {
  size?: string;
  price: number | undefined;
  discountPrice?: number;
  countInStock: number;
  images: string[];
  video?: string;
  onSale: boolean;
  _id: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  gender: "male" | "female" | "unisex";
  rating?: number;
  numReviews?: number;
  reviews?: Review[];
  variants: Variant[];
  createdAt: string;
  updatedAt: string;
}
