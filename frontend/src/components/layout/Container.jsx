import React from "react";

const Container = ({ children }) => {
  return (
    <div className="flex justify-center my-10">
      <div className="px-4 max-w-max md:max-w-6xl">{children}</div>
    </div>
  );
};

export default Container;
