import { useSelector } from "react-redux";
import Container from "../../components/layout/Container";
import CheckoutStepper from "../../components/CheckoutStepper";
import CheckoutCart from "../../components/CheckoutCart";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PlaceOrderButton from "../../components/PlaceOrderButton";

const OrderSummary = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.orderCompleted) {
      return;
    }
    if (!cart.shippingAddress) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.shippingAddress, cart.paymentMethod, cart.orderCompleted, navigate]);

  return (
    <Container>
      <CheckoutStepper step1 step2 step3 step4 />
      <div className="flex gap-2">
        <div className="w-full flex-[9]">
          <div className="border-slate-100 bg-stone-50 border-2 rounded-xl flex flex-col justify-center p-6 my-4 max-w-3xl m-auto">
            <h1 className="text-xl font-bold text-left my-1 w-full">
              Order summary
            </h1>
            <div>
              <div className="mt-6 pb-4 border-b-2 border-slate-200">
                <h2 className="uppercase font-bold">Shipping Address:</h2>
                <p>
                  {cart.shippingAddress?.addressLine1},{" "}
                  {cart.shippingAddress?.addressLine2}
                </p>
                <p>
                  {cart.shippingAddress?.city},{" "}
                  {cart.shippingAddress?.postalCode}
                </p>
                <p>{cart.shippingAddress?.country}</p>
              </div>
              <div className="mt-6 pb-4 border-b-2 border-slate-200">
                <h2 className="uppercase font-bold">Payment Method</h2>
                <p>{cart.paymentMethod}</p>
              </div>
              <div className="mt-6 pb-4 border-b-2 border-slate-200">
                <h2 className="uppercase font-bold">Items</h2>
                {cart.cartItems.length === 0 ? (
                  <div>Your cart is empty.</div>
                ) : (
                  <>
                    {cart.cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center py-2 md:pt-6 md:pb-3 border-b-2 gap-4 border-stone-200 last-of-type:border-none"
                      >
                        <div className="flex-[6] w-full flex gap-4 items-center">
                          <div className="flex-[2]">
                            <Link to={`/products/${item._id}`}>
                              <img
                                src="https://www.parfimo.bg/data/cache/thumb_min500_max1000-min500_max1000-12/products/56279/1530460699/creed-aventus-parfyumna-voda-dla-mezczyzn-75-ml-238781.jpg"
                                alt={item.name}
                                className="w-10 h-10 md:w-16 md:h-16 object-contain"
                              />
                            </Link>
                          </div>
                          <div className="w-full flex-[10]">
                            <Link to={`/products/${item._id}`}>
                              <p className="hidden md:block text-xs">
                                {item.brand}
                              </p>
                              <p className="text-md md:text-lg break-words">
                                {item.name}
                              </p>
                            </Link>
                          </div>
                        </div>
                        <div className="flex-[2] w-full text-sm">
                          {item.variant?.size}ml
                        </div>
                        <div className="flex-[2] w-full text-sm">
                          {item.quantity}x
                        </div>
                        <div className="flex-[2] w-full text-sm text-center">
                          {item.variant.discountPrice > 0 ? (
                            <>
                              <span className="line-through text-xs">
                                ${(item.variant?.price).toFixed(2)}
                              </span>
                              <span className="text-red-500 font-bold block text-base">
                                ${item.variant.discountPrice.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <>${(item.variant?.price).toFixed(2)}</>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
              <div className="p-2 mb-4 pr-6 flex gap-2 justify-end items-center">
                <h5 className="">Sub total:</h5>
                <p className="text-xl font-bold">${cart.subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-end p-0">
                <PlaceOrderButton cart={cart} />
              </div>
            </div>
          </div>
        </div>
        {cart.cartItems.length > 0 && <CheckoutCart cart={cart} />}
      </div>
    </Container>
  );
};

export default OrderSummary;
