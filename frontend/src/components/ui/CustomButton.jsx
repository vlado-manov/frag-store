import React from "react";

const buttonStyles = {
  type1: "bg-blue-500 text-white hover:bg-blue-600",
  type2: "bg-green-500 text-white hover:bg-green-600",
  type3: "bg-red-500 text-white hover:bg-red-600",
  type4: "bg-yellow-500 text-white hover:bg-yellow-600",
  type5: "bg-purple-500 text-white hover:bg-purple-600",
};

const CustomButton = (props) => {
  return (
    <button
      variant={props.variant}
      onClick={props.onClick}
      className={`px-4 py-2 rounded ${
        buttonStyles[props.variant] || buttonStyles.type1
      }`}
    >
      {props.title}
    </button>
  );
};

export default CustomButton;
