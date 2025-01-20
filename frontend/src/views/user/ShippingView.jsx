import React from "react";
import Container from "../../components/layout/Container";
import CheckoutStepper from "../../components/CheckoutStepper";

const ShippingView = () => {
  return (
    <Container>
      <CheckoutStepper step1 step2 />
    </Container>
  );
};

export default ShippingView;
