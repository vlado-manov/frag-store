import React from "react";

const Container = ({ children }) => {
  return (
    <div className="flex justify-center py-5 md:py-10">
      <div className="px-4 w-full max-w-full md:max-w-6xl">{children}</div>
    </div>
  );
};

export default Container;
