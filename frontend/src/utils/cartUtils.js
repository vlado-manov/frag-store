export const calculateItemsPrice = (cartItems) =>
  cartItems.reduce((acc, item) => acc + item.variant.price * item.quantity, 0);

export const calculateShipping = (cartItems) => {
  const totalPrice = calculateItemsPrice(cartItems);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  if (totalPrice >= 600) return 0;
  if (totalQuantity >= 4) return 28;
  if (totalQuantity === 3) return 22;
  if (totalQuantity === 2) return 15;
  if (totalQuantity === 1) return 12;
  return 0;
};

export const calculatePromoCodeDiscount = (cartItems) =>
  cartItems.reduce((acc, item) => {
    const discount = item.variant.discountPrice
      ? (item.variant.price - item.variant.discountPrice) * item.quantity
      : 0;
    return acc + discount;
  }, 0);

export const calculateSubtotal = (cartItems) => {
  const itemsPrice = calculateItemsPrice(cartItems);
  const shippingPrice = calculateShipping(cartItems);
  const promoCodeDiscount = calculatePromoCodeDiscount(cartItems);
  return itemsPrice + shippingPrice - promoCodeDiscount;
};
