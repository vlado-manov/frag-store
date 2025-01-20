import React from "react";
import { IoCheckmark } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";

const CheckoutStepper = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex justify-center items-center font-roboto gap-2 py-4">
      <div className="flex items-center gap-2">
        <div className="relative pb-8 overflow-visible hover:cursor-pointer">
          <IoCheckmark className="text-sky-500" size={20} />
          <h2 className="text-sky-400 absolute -left-1/2 -translate-x-1/2 bottom-0 w-full whitespace-nowrap">
            Sign in
          </h2>
        </div>
        <div className="bg-sky-500 w-28 h-0.5 rounded-full mb-8"></div>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative pb-8 overflow-visible hover:cursor-pointer">
          {step2 & step3 ? (
            <IoCheckmark className="text-sky-500" size={20} />
          ) : step2 ? (
            <GoDotFill
              className="text-sky-500 transition-colors duration-300 ease-in-out"
              size={20}
            />
          ) : (
            <GoDotFill
              className="text-slate-300 transition-colors duration-300 ease-in-out"
              size={20}
            />
          )}
          <h2
            className={`absolute -left-1/2 -translate-x-1/2 bottom-0 w-full whitespace-nowrap transition-colors duration-300 ease-in-out ${
              step3 ? "text-sky-400" : "text-sky-500 font-bold"
            }`}
          >
            Shipping
          </h2>
        </div>
        <div
          className={`w-28 h-0.5 rounded-full mb-8 transition-colors duration-300 ease-in-out ${
            step3 ? "bg-sky-500" : "bg-slate-300"
          }`}
        ></div>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative pb-8 overflow-visible hover:cursor-pointer">
          {step3 & step4 ? (
            <IoCheckmark className="text-sky-500" size={20} />
          ) : step3 ? (
            <GoDotFill
              className="text-sky-500 transition-colors duration-300 ease-in-out"
              size={20}
            />
          ) : (
            <GoDotFill
              className="text-slate-300 transition-colors duration-300 ease-in-out"
              size={20}
            />
          )}
          <h2
            className={`absolute -left-1/2 -translate-x-1/2 bottom-0 w-full whitespace-nowrap transition-colors duration-300 ease-in-out ${
              step4
                ? "text-sky-400"
                : step3
                ? "text-sky-500 font-bold"
                : "text-slate-300"
            }`}
          >
            Payment
          </h2>
        </div>
        <div
          className={`w-28 h-0.5 rounded-full mb-8 transition-colors duration-300 ease-in-out ${
            step4 ? "bg-sky-500" : "bg-slate-300"
          }`}
        ></div>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative pb-8 overflow-visible">
          {step4 ? (
            <GoDotFill
              className="text-sky-500 transition-colors duration-300 ease-in-out"
              size={20}
            />
          ) : (
            <GoDotFill
              className="text-slate-300 transition-colors duration-300 ease-in-out"
              size={20}
            />
          )}
          <h2
            className={`absolute -left-1/2 -translate-x-1/2 bottom-0 w-full whitespace-nowrap transition-colors duration-300 ease-in-out ${
              step4 ? "text-sky-500 font-bold" : "text-slate-300"
            }`}
          >
            Place order
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CheckoutStepper;
