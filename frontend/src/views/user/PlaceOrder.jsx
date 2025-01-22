import { useSelector } from "react-redux";
import Container from "../../components/layout/Container";
import CheckoutStepper from "../../components/CheckoutStepper";

const PlaceOrder = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <Container>
      <CheckoutStepper step1 step2 step3 step4 />
      <div>
        <h1>Order Summary</h1>
        <h2>Shipping Address</h2>
        <p>{cart.shippingAddress?.addressLine1}</p>
        <p>{cart.shippingAddress?.addressLine2}</p>
        <p>
          {cart.shippingAddress?.city}, {cart.shippingAddress?.postalCode}
        </p>
        <p>{cart.shippingAddress?.country}</p>
        <h2>Payment Method</h2>
        <p>{cart.paymentMethod}</p>
        <h2>Items</h2>
        {cart.cartItems.map((item, index) => (
          <div key={index}>
            <p>
              {item.name} {item.variant.size}ml - {item.quantity} x $
              {item.variant.price}
            </p>
          </div>
        ))}
        Items price: ${cart.itemsPrice}
        shipping: ${cart.shipping}
        discount: ${cart.discount}
        Sub total: ${cart.subtotal}
      </div>
    </Container>
  );
};

export default PlaceOrder;
