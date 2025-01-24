import React, { useState } from "react";
import Settings from "./Settings";
import {
  useGetOrderByIdQuery,
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
import SelectPaymentModal from "../../components/modals/SelectPaymentModal";
import { toast } from "react-toastify";

const OrderView = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    isError,
  } = useGetOrderByIdQuery(orderId);
  const [updatePaymentMethod] = useUpdatePaymentMethodMutation();
  const handlePaymentMethodChange = async (newPaymentMethod) => {
    try {
      await updatePaymentMethod({
        orderId,
        paymentMethod: newPaymentMethod,
      }).unwrap();
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };
  //TODO: Cancel Order
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
          <h1 className="text-2xl font-bold text-left my-1">
            Order #{order._id}
          </h1>
          <p className="text-gray-600 text-sm text-left font-thin">
            Created on {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}
          </p>
          <p className="text-gray-600 text-sm text-left font-thin">
            Total price: ${order.totalPrice.toFixed(2)}
          </p>
          <div className="flex justify-center items-center py-6 px-24 my-6">
            <div className="text-center relative group">
              <div className="rounded-full py-4 bg-orange-400 min-w-24 w-24 h-24 flex items-center justify-center border-4 border-white">
                <BsFillClockFill size={40} color="white" />
              </div>
              <p
                className={`${
                  order.orderStatus === "pending"
                    ? "font-bold"
                    : "text-slate-200"
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
                  Payment received on 11/04/2991 13:21
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
          </div>
          <div className="flex gap-4">
            <div className="flex-[6] border-slate-100 bg-stone-50 border-2 rounded-xl p-6">
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
            <div className="flex-[6] border-slate-100 bg-stone-50 border-2 rounded-xl p-6">
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
              {order.isPaid ? (
                <>
                  <h5 className="mt-1 text-emerald-500">
                    Payment received on 11/04/2025 12:32
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
                  <button className="rounded text-white bg-black py-2 px-6">
                    Pay ${order.totalPrice.toFixed(2)} with{" "}
                    {order.paymentMethod === "paypal"
                      ? "Paypal"
                      : "Credit Card"}
                  </button>
                  <SelectPaymentModal
                    paymentMethod={order.paymentMethod}
                    onSave={handlePaymentMethodChange}
                  />
                </>
              )}
            </div>
          </div>
          <div className="border-slate-100 bg-stone-50 border-2 rounded-xl flex flex-col justify-center p-6 my-4">
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
                    <Link to={`/products/${item._id}`}>
                      <img
                        src="https://www.parfimo.bg/data/cache/thumb_min500_max1000-min500_max1000-12/products/56279/1530460699/creed-aventus-parfyumna-voda-dla-mezczyzn-75-ml-238781.jpg"
                        alt={item.name}
                        className="w-10 h-10 object-contain"
                      />
                    </Link>
                  </div>
                  <div className="w-full flex-[10]">
                    <Link to={`/products/${item._id}`}>
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
          {!order.isDelivered && (
            <button
              type="button"
              className="text-white bg-red-500 py-2 px-6 rounded"
            >
              Cancel order
            </button>
          )}
        </>
      )}
    </Settings>
  );
};

export default OrderView;
