import React from "react";

const buttonStyles = {
  default: "bg-black text-white",
  primary: "bg-green-500 text-white hover:bg-green-600",
  secondary: "bg-red-500 text-white hover:bg-red-600",
  tertiary:
    "text-white border-2 border-white rounded-2xl shadow-2xl bg-black bg-opacity-70 hover:bg-opacity-90",
};
const CustomButton = ({ variant, onClick, additionalStyles, title }) => {
  return (
    <button
      variant={variant}
      onClick={onClick}
      className={`px-4 py-2 rounded ${
        buttonStyles[variant] || buttonStyles.default
      } ${additionalStyles}`}
    >
      {title}
    </button>
  );
};

export default CustomButton;
