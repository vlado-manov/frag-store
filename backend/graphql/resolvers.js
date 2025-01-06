import Product from "../models/productModel.js";

export const resolvers = {
  Query: {
    products: async (_, args) => {
      const {
        category,
        minPrice,
        maxPrice,
        maxSize,
        brand_slug,
        gender,
        sortBy,
        sortOrder,
      } = args;
      const filter = {};
      if (category) filter.category = category;
      if (brand_slug) filter.brand_slug = brand_slug;
      if (gender) filter.gender = gender;
      if (minPrice || maxPrice) {
        filter["variants.price"] = {};
        if (minPrice) filter["variants.price"].$gte = minPrice;
        if (maxPrice) filter["variants.price"].$lte = maxPrice;
      }
      if (maxSize) filter["variants.size"] = { $lte: `${maxSize}ml` };
      const sortOptions = {};
      if (sortBy) {
        sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
      }

      try {
        return await Product.find(filter).sort(sortOptions);
      } catch (error) {
        throw new Error("Error fetching products");
      }
    },
    categories: async () => {
      try {
        return await Product.distinct("category");
      } catch (error) {
        throw new Error("Error fetching categories");
      }
    },
    brands: async () => {
      try {
        const brands = await Product.aggregate([
          { $group: { _id: "$brand", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 20 },
        ]);
        return brands.map((brand) => brand._id);
      } catch (error) {
        throw new Error("Error fetching brands");
      }
    },
    availableProducts: async () => {
      try {
        return await Product.find({ "variants.countInStock": { $gt: 0 } });
      } catch (error) {
        throw new Error("Error fetching available products");
      }
    },
    topBrands: async () => {
      try {
        const brands = await Product.aggregate([
          { $group: { _id: "$brand", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 5 },
        ]);
        return brands.map((brand) => brand._id);
      } catch (error) {
        throw new Error("Error fetching top brands");
      }
    },
  },
};
