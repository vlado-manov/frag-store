import React, { useRef, useEffect } from "react";
import { Badge, IconButton } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import useDropDown from "../../hooks/useDropDown";
import { removeFromCart } from "../../slices/cartSlice";

const CartDropdown = ({ scrolled }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useDropDown();
  const dropdownRef = useRef(null);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemsPrice = useSelector((state) => state.cart.itemsPrice);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const removeFromCartHandler = async (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <div
      className={`${
        isDropdownOpen ? "bg-white rounded-t-xl " : ""
      }px-2 relative py-2`}
      ref={dropdownRef}
    >
      <IconButton
        sx={{
          color: isDropdownOpen ? "#0ea5e9" : scrolled ? "#fff" : "#6366f1",
          padding: "12px",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.05)",
          },
        }}
        onClick={toggleDropdown}
      >
        <Badge
          badgeContent={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          sx={{
            ".MuiBadge-badge": {
              backgroundColor: `${scrolled ? "#00c93c" : "#313131"}`,
              color: "white",
            },
          }}
        >
          <ShoppingCart />
        </Badge>
      </IconButton>
      {isDropdownOpen && (
        <div className="fixed w-96 shadow-2xl shadow-gray-600 top-[3.5rem] right-2 bg-slate-100 text-black rounded pt-4 pb-2 font-roboto z-50">
          <h2 className="text-sm px-4 border-b-2 border-slate-200 pb-4 shadow-lg shadow-stone-200">
            Cart items ({cartItems.length})
          </h2>
          {cartItems.length > 0 ? (
            <div className="py-4 max-h-40 overflow-y-auto">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-2 border-b-2 border-slate-200 last-of-type:border-none"
                >
                  <div className="flex items-center gap-2 relative pr-10">
                    <p className="text-xs">{item.quantity}x</p>
                    <Link
                      to={`/products/${item._id}`}
                      className="w-14 h-14 min-w-14 min-h-14 aspect-square"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <img
                        src="https://www.parfimo.bg/data/cache/thumb_min500_max1000-min500_max1000-12/products/56279/1530460699/creed-aventus-parfyumna-voda-dla-mezczyzn-75-ml-238781.jpg"
                        alt={item.name}
                        className="w-full h-14 object-contain"
                      />
                    </Link>
                    <Link
                      to={`/products/${item._id}`}
                      className="w-full max-w-44"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <p className="text-xs">{item.brand}</p>
                      <p className="text-sm max-w-44 truncate overflow-hidden whitespace-nowrap pr-8">
                        {item.name}
                      </p>
                    </Link>
                    <p className="text-sm text-right w-full">
                      ${item.variant.price}
                    </p>
                    <div
                      className="absolute top-1/2 -translate-y-1/2 right-1 cursor-pointer"
                      onClick={() => removeFromCartHandler(item)}
                    >
                      <IoMdCloseCircle size={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h3 className="text-lg uppercase p-4">Your cart is empty</h3>
          )}
          <div className="border-t-2 border-slate-200 p-4">
            {itemsPrice > 0 && (
              <p className="text-sm text-black flex items-center gap-2 py-2">
                Items price:{" "}
                <span className="font-bold text-lg">${itemsPrice}</span>
              </p>
            )}
            <button
              disabled={cartItems.length === 0}
              className=" bg-sky-500 text-white text-lg rounded shadow-lg py-2 w-full mt-2 disabled:bg-sky-100 disabled:text-stone-400 disabled:cursor-not-allowed disabled:pointer-events-none"
              onClick={() => setIsDropdownOpen(false)}
            >
              <Link to="/shipping" className="block w-full">
                Checkout
              </Link>
            </button>
            <Link
              to="/cart"
              className="block text-center bg-black text-white text-lg rounded shadow-lg py-2 w-full mt-2"
              onClick={() => setIsDropdownOpen(false)}
            >
              View cart
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
