import React from "react";

const ContainerGradient = ({ children }) => {
  return (
    <div className="flex justify-center py-6 md:py-10 bg-gradient-to-r from-sky-500 to-rose-500">
      <div className="px-4 w-full max-w-full md:max-w-6xl">{children}</div>
    </div>
  );
};

export default ContainerGradient;
