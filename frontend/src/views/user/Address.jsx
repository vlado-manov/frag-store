import React from "react";
import Settings from "./Settings";

const Address = () => {
  return (
    <Settings>
      <h1 className="text-2xl font-bold text-left my-1">Addresses</h1>
      <p className="text-gray-600 text-sm text-left font-thin">
        Manage your shipping and billing addresses for a smoother checkout
        experience.
      </p>
    </Settings>
  );
};

export default Address;
