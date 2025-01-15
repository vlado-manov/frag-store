import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCartItems } from "../slices/cartSlice";

const CartSync = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStorageChange = () => {
      // Прочитаме стойността от localStorage и обновяваме Redux store
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const cartData = JSON.parse(storedCart);
        dispatch(setCartItems(cartData.cartItems)); // Обновяваме cartItems с новите данни от localStorage
      }
    };

    // Добавяме слушател за събитието 'storage', което ще бъде активирано при промяна в localStorage
    window.addEventListener("storage", handleStorageChange);

    // Почиства слушателя при демонтиране
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  return null; // Този компонент не визуализира нищо, той само синхронизира данните
};

export default CartSync;
