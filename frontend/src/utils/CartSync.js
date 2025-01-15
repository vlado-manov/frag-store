import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCartItems } from "../slices/cartSlice";

const CartSync = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStorageChange = () => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const cartData = JSON.parse(storedCart);
        dispatch(setCartItems(cartData.cartItems));
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  return null;
};

export default CartSync;
