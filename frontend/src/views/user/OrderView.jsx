import React, { useEffect } from "react";
import Settings from "./Settings";
import {
  useCancelOrderMutation,
  useGetOrderByIdQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
  useUpdatePaymentMethodMutation,
} from "../../slices/ordersSlice";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/ux/Loader";
import Message from "../../components/ux/Message";
import { BsFillClockFill } from "react-icons/bs";
import { FaPiggyBank } from "react-icons/fa";
import { FaTruckMoving } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { format } from "date-fns";
import { ImCancelCircle } from "react-icons/im";
import SelectPaymentModal from "../../components/modals/SelectPaymentModal";
import { toast } from "react-toastify";
import ConfirmCancellationOrder from "../../components/modals/ConfirmCancellationOrder";
import CustomButton from "../../components/ui/CustomButton";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";

const OrderView = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    isError,
  } = useGetOrderByIdQuery(orderId);
  const [updatePaymentMethod] = useUpdatePaymentMethodMutation();
  const [cancelOrder] = useCancelOrderMutation();
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);
  async function onApproveTest() {
    await payOrder({
      orderId,
      details: {
        payer: {
          email_address: "payer@example.com", // Тук подаваш правилния email за PayPal
        },
        paymentMethod: "paypal",
        id: "some-paypal-id",
        status: "approved",
        update_time: "2025-02-12T12:00:00Z",
      },
    });
    refetch();
    toast.success("Плащането беше успешно!");
  }
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        const paymentDetails = {
          ...details,
          paymentMethod: "paypal",
        };

        await payOrder({ orderId, details: paymentDetails });
        refetch();
        toast.success("Плащането беше успешно!");
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  }
  function onError(err) {
    toast.error(err.message);
  }

  const handlePaymentMethodChange = async (newPaymentMethod) => {
    try {
      await updatePaymentMethod({
        orderId,
        paymentMethod: newPaymentMethod,
      }).unwrap();
      refetch();
      toast.success(
        `You successfully changed the payment method to ${
          newPaymentMethod == "creditCard" ? "Credit Card" : "Paypal"
        }`
      );
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const handleCancelOrder = async () => {
    try {
      await cancelOrder(orderId).unwrap();
      refetch();
      toast.success("The order was successfully cancelled!");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };
  //TODO: Pay order w/ Paypal
  //TODO: Pay order w/ Stripe

  return (
    <Settings>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message severity="error" variant="standard">
          The order didn't load successfully. Please try again!
        </Message>
      ) : (
        <>
          <h1 className="text-2xl text-white font-bold text-left my-1">
            Order #{order._id}
          </h1>
          <p className="text-slate-100 text-sm text-left font-thin">
            Created on {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}
          </p>
          <p className="text-slate-100 text-sm text-left font-thin">
            Total price: ${order.totalPrice.toFixed(2)}
          </p>
          <div className="flex justify-center items-center py-6 px-24 mt-6 mb-4 border-slate-100 bg-white shadow-lg border-2 rounded-xl">
            <div className="text-center relative group">
              <div className="rounded-full py-4 bg-orange-400 min-w-24 w-24 h-24 flex items-center justify-center border-4 border-white">
                <BsFillClockFill size={40} color="white" />
              </div>
              <p
                className={`${
                  order.orderStatus === "pending"
                    ? "font-bold"
                    : "text-gray-600"
                }`}
              >
                Pending
              </p>
              <div className="absolute p-2 bg-black text-white text-xs font-thin rounded -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap hidden group-hover:block">
                Submitted on{" "}
                {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}
              </div>
            </div>
            <div
              className={`${
                order.isPaid ? "bg-orange-400 " : "bg-orange-100 "
              }w-full h-2`}
            ></div>
            <div className="text-center relative group">
              <div
                className={`${
                  order.isPaid ? "bg-amber-400 " : "bg-amber-100 "
                }rounded-full py-4 min-w-24 w-24 h-24 flex items-center justify-center border-4 border-white`}
              >
                <FaPiggyBank size={40} color="white" />
              </div>
              <p
                className={`${
                  order.orderStatus === "paid" ? "font-bold" : "text-slate-200"
                }`}
              >
                Paid
              </p>
              {order.orderStatus === "paid" && (
                <div className="absolute p-2 bg-black text-white text-xs font-thin rounded -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap hidden group-hover:block">
                  Payment received on{" "}
                  {format(new Date(order.paidAt), "dd/MM/yyyy HH:mm")}
                </div>
              )}
            </div>
            <div
              className={`${
                order.orderStatus === "shipped"
                  ? "bg-amber-400 "
                  : "bg-amber-100 "
              }w-full h-2`}
            ></div>
            <div className="text-center relative group">
              <div
                className={`${
                  order.orderStatus === "shipped"
                    ? "bg-sky-400 "
                    : "bg-sky-100 "
                }rounded-full py-4 min-w-24 w-24  h-24 flex items-center justify-center border-4 border-white`}
              >
                <FaTruckMoving size={40} color="white" />
              </div>
              <p
                className={`${
                  order.orderStatus === "shipped"
                    ? "font-bold"
                    : "text-slate-200"
                }`}
              >
                Shipped
              </p>
              {order.orderStatus === "shipped" && (
                <div className="absolute p-2 bg-black text-white text-xs font-thin rounded -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap hidden group-hover:block">
                  Sent on 11/04/2991 13:21
                </div>
              )}
            </div>
            <div
              className={`${
                order.isDelivered ? "bg-sky-400 " : "bg-sky-100 "
              }w-full h-2`}
            ></div>
            <div className="text-center relative group">
              <div
                className={`${
                  order.isDelivered ? "bg-emerald-400 " : "bg-emerald-100 "
                }rounded-full py-4 min-w-24 w-24  h-24 flex items-center justify-center border-4 border-white`}
              >
                <IoHome size={40} color="white" />
              </div>
              <p
                className={`${
                  order.orderStatus === "delivered"
                    ? "font-bold"
                    : "text-slate-200"
                }`}
              >
                Delivered
              </p>
              {order.orderStatus === "delivered" && (
                <div className="absolute p-2 bg-black text-white text-xs font-thin rounded -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap hidden group-hover:block">
                  Delivered on 11/04/2991 13:21
                </div>
              )}
            </div>

            {order.orderStatus === "cancelled" && (
              <>
                <div className="w-full h-2 bg-red-500"></div>
                <div className="text-center relative group">
                  <div className="bg-red-500 rounded-full py-4 min-w-24 w-24  h-24 flex items-center justify-center border-4 border-white">
                    <ImCancelCircle size={40} color="white" />
                  </div>
                  <p className="font-bold text-red-400">Cancelled</p>
                  <div className="absolute p-2 bg-black text-white text-xs font-thin rounded -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap hidden group-hover:block">
                    Cancelled on{" "}
                    {format(new Date(order.updatedAt), "dd/MM/yyyy HH:mm")}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="flex gap-4">
            <div className="flex-[6] border-slate-100 bg-white shadow-lg border-2 rounded-xl p-6">
              <h1 className="text-lg font-bold text-left my-1 w-full">
                Shipping address
              </h1>
              <h5 className="font-thin">
                {order.shippingAddress.country}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode}
              </h5>
              <p>
                {order.shippingAddress.addressLine1}
                {order.shippingAddress.addressLine2 &&
                  `, ${order.shippingAddress.addressLine2}`}
              </p>
            </div>
            <div className="flex-[6] border-slate-100 bg-white shadow-lg border-2 rounded-xl p-6">
              <h1 className="text-lg font-bold text-left my-1 w-full">
                Payment method
              </h1>
              <div className="flex justify-between items-center">
                <h5>
                  Via{" "}
                  {order.paymentMethod === "paypal" ? "Paypal" : "Credit Card"}
                </h5>
                {order.paymentMethod === "paypal" ? (
                  <FaCcPaypal size={24} />
                ) : (
                  <FaCreditCard size={24} />
                )}
              </div>
              {order.orderStatus === "cancelled" ? (
                <h5 className="text-red-500 mt-2">
                  You can no longer complete the payment since the order has
                  been cancelled.
                </h5>
              ) : order.isPaid ? (
                <>
                  <h5 className="mt-1 text-emerald-500">
                    Payment received on{" "}
                    {format(new Date(order.paidAt), "dd/MM/yyyy HH:mm")}
                  </h5>
                  <h5 className="mt-1">
                    Total: ${order.totalPrice.toFixed(2)}
                  </h5>
                </>
              ) : (
                <>
                  <h5 className="text-red-500 my-2">
                    Payment is pending. Please complete the payment to proceed
                    with your order.
                  </h5>
                  {order.paymentMethod === "paypal" ? (
                    <PayPalButtons
                      fundingSource="paypal"
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    ></PayPalButtons>
                  ) : (
                    <CustomButton
                      tw="px-6 w-full block mb-2"
                      onClick={onApproveTest}
                    >
                      Pay ${order.totalPrice.toFixed(2)} with Credit card
                    </CustomButton>
                  )}
                  <SelectPaymentModal
                    paymentMethod={order.paymentMethod}
                    onSave={handlePaymentMethodChange}
                  />
                </>
              )}
            </div>
          </div>
          <div className="border-slate-100 bg-white shadow-lg border-2 rounded-xl flex flex-col justify-center p-6 my-4">
            <h1 className="text-lg font-bold text-left my-1 w-full">
              Ordered items
            </h1>

            <div className="flex gap-4">
              <div className="flex-[6] w-full text-sm text-gray-400">Item</div>
              <div className="flex-[2] w-full text-sm text-gray-400 flex justify-center">
                Size
              </div>
              <div className="flex-[2] w-full text-sm text-gray-400 flex justify-center">
                Quantity
              </div>
              <div className="flex-[2] w-full text-sm text-gray-400 flex justify-center">
                Price
              </div>
            </div>
            {order.orderItems.map((item, index) => (
              <div
                key={item._id}
                className={`${
                  index % 2 ? "bg-white " : ""
                }flex items-center py-2 border-b-2 gap-4 border-stone-200 last-of-type:border-none`}
              >
                <div className="flex-[6] w-full flex gap-4 items-center">
                  <div className="flex-[2]">
                    <Link to={`/products/${item.product}`}>
                      <img
                        src="https://www.parfimo.bg/data/cache/thumb_min500_max1000-min500_max1000-12/products/56279/1530460699/creed-aventus-parfyumna-voda-dla-mezczyzn-75-ml-238781.jpg"
                        alt={item.name}
                        className="w-10 h-10 object-contain"
                      />
                    </Link>
                  </div>
                  <div className="w-full flex-[10]">
                    <Link to={`/products/${item.product}`}>
                      <p className="hidden md:block text-xs">{item.brand}</p>
                      <p className="text-sm md:text-base break-words">
                        {item.name}
                      </p>
                    </Link>
                  </div>
                </div>
                <div className="flex-[2] w-full text-sm flex justify-center">
                  {item.variant?.size}ml
                </div>
                <div className="flex-[2] w-full text-sm flex justify-center">
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
            <div className="pt-2 pr-6 flex gap-2 justify-end items-center">
              <h5 className="">Sub total:</h5>
              <p className="text-lg font-bold">
                ${order.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
          {!order.isDelivered &&
            !order.isPaid &&
            order.orderStatus !== "cancelled" && (
              <ConfirmCancellationOrder cancelHandler={handleCancelOrder} />
            )}
        </>
      )}
    </Settings>
  );
};

export default OrderView;
