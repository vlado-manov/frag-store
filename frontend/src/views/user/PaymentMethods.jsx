import React from "react";
import Settings from "./Settings";

const PaymentMethods = () => {
  return (
    <Settings>
      <h1 className="text-2xl font-bold text-left my-1">Payment Methods</h1>
      <p className="text-gray-600 text-sm text-left font-thin">
        Add or update your preferred payment options to make purchases faster
        and easier.
      </p>
    </Settings>
  );
};

export default PaymentMethods;
