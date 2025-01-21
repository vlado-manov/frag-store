import React, { useState } from "react";
import CheckoutStepper from "../../components/CheckoutStepper";
import Container from "../../components/layout/Container";
import { Link } from "react-router-dom";
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { LiaCcAmex } from "react-icons/lia";
import { FaCcPaypal } from "react-icons/fa";

const PaymentView = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const handleSelect = (method) => {
    setSelectedMethod(method);
  };
  return (
    <Container>
      <CheckoutStepper step1 step2 step3 />
      <div className="border-slate-100 bg-stone-50 border-2 rounded-xl flex flex-col justify-center p-6 my-4 max-w-3xl m-auto">
        <h1 className="text-xl font-bold text-left my-1 w-full">
          Select a payment method
        </h1>
        <div
          onClick={() => handleSelect("creditCard")}
          className={`rounded-lg my-2 border-2 ${
            selectedMethod === "creditCard"
              ? "border-sky-500"
              : "border-slate-100 hover:border-sky-300"
          } flex items-center justify-between bg-white p-4 hover:cursor-pointer`}
        >
          <h1 className="text-lg font-bold m-0">Credit Card</h1>
          <div className="flex items-center gap-2">
            <FaCcVisa size={32} />
            <FaCcMastercard size={32} />
            <LiaCcAmex size={32} />
          </div>
        </div>
        <div
          onClick={() => handleSelect("paypal")}
          className={`rounded-lg border-2 ${
            selectedMethod === "paypal"
              ? "border-sky-500"
              : "border-slate-100 hover:border-sky-300"
          } flex items-center justify-between bg-white p-4 hover:cursor-pointer`}
        >
          <h1 className="text-lg font-bold m-0">Paypal</h1>
          <div className="flex items-center gap-2">
            <FaCcPaypal size={32} />
          </div>
        </div>
        <Link to="/placeOrder">
          <button className="bg-black rounded py-2 px-4 text-white my-1 mt-4 w-fit">
            Next Step
          </button>
        </Link>
      </div>
    </Container>
  );
};

export default PaymentView;
