import React from "react";

const PromoHome = () => {
  return (
    <div className="w-full bg-rose-300 flex items-center justify-center flex-col py-32">
      <h1 className="text-white uppercase font-extrabold text-6xl">
        20% off everything
      </h1>
      <p className="py-2 text-white font-thin text-3xl">
        Use promo code{" "}
        <span className="text-rose-600 underline font-bold">XMAS20</span>
      </p>
    </div>
  );
};

export default PromoHome;
