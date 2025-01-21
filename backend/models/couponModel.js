import mongoose from "mongoose";
const promoCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountValue: { type: Number, required: true },
  discountType: { type: String, enum: ["percentage", "fixed"], required: true },
  expirationDate: { type: Date, required: false },
  isActive: { type: Boolean, default: true },
});

const PromoCode = mongoose.model("PromoCode", promoCodeSchema);
export default PromoCode;
