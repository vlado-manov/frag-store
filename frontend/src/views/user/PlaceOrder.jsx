import React from "react";
import Container from "../../components/layout/Container";
import CheckoutStepper from "../../components/CheckoutStepper";

const PlaceOrder = () => {
  return (
    <Container>
      <CheckoutStepper step1 step2 step3 step4 />
    </Container>
  );
};

export default PlaceOrder;
