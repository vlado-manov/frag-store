import React from "react";
import CheckoutStepper from "../../components/CheckoutStepper";
import Container from "../../components/layout/Container";

const PaymentView = () => {
  return (
    <Container>
      <CheckoutStepper step1 step2 step3 />
      <div className="border-slate-100 bg-stone-50 border-2 rounded-xl flex flex-col justify-center p-6 my-4">
        <h1 className="text-xl font-bold text-left my-1 w-full">
          Pick you preferable way to pay
        </h1>
      </div>
    </Container>
  );
};

export default PaymentView;
