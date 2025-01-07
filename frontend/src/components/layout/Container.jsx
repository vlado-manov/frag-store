import React from "react";

const Container = ({ children }) => {
  return (
    <div className="flex justify-center my-10">
      <div className="max-w-max md:max-w-6xl">{children}</div>
    </div>
  );
};

export default Container;
