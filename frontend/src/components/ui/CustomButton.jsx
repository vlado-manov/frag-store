import React from "react";
import { Link } from "react-router-dom";

const buttonStyles = {
  default:
    "bg-black text-white shadow hover:shadow-lg hover:bg-gray-800 transition duration-300 disabled:pointer-events-none disabled:opacity-40 disabled:text-stone-300",
  primary:
    "bg-sky-500 text-white shadow hover:shadow-lg hover:bg-sky-400 transition duration-300 disabled:pointer-events-none disabled:opacity-40 disabled:text-stone-300",
  secondary:
    "text-black bg-slate-200 hover:bg-slate-100 transition duration-300 disabled:pointer-events-none disabled:opacity-40 disabled:bg-slate-400 disabled:text-stone-300",
  tertiary:
    "text-white border-2 border-white rounded-2xl shadow-2xl bg-black bg-opacity-70 hover:bg-opacity-90 transition duration-300 disabled:pointer-events-none disabled:opacity-40 disabled:text-stone-300",
  alert:
    "text-white bg-red-500 shadow hover:shadow-lg hover:bg-red-400 transition duration-300 disabled:pointer-events-none disabled:opacity-40 disabled:text-stone-300",
  wishlist:
    "bg-orange-400 text-white shadow hover:shadow-lg hover:bg-orange-300 transition duration-300 w-full rounded-none disabled:pointer-events-none disabled:opacity-40 disabled:text-stone-300",
};

const CustomButton = ({
  variant = "default",
  type = "button",
  onClick,
  tw = "",
  to,
  disabled = false,
  children,
}) => {
  const className = `px-4 py-2 text-center rounded ${
    buttonStyles[variant] || buttonStyles.default
  } ${tw}`;

  return to ? (
    <Link
      to={to}
      className={`${className} ${
        disabled ? "pointer-events-none opacity-40 text-stone-300" : ""
      }`}
    >
      {children}
    </Link>
  ) : (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
};

export default CustomButton;
