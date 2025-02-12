import React from "react";
import Settings from "./Settings";
import { FaCheck } from "react-icons/fa6";
import { RiCloseLargeFill } from "react-icons/ri";
import { useGetMyOrdersQuery } from "../../slices/ordersSlice";
import { format } from "date-fns";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomPagination from "../../components/ux/CustomPagination";

const OrdersList = () => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const { data } = useGetMyOrdersQuery({ pageNumber: pageNumber || 1 });
  const handlePageChange = (newPage) => {
    navigate(`/orders/page/${newPage}`);
  };
  return (
    <Settings>
      <h1 className="text-2xl text-white font-bold text-left my-1">
        Your Orders
      </h1>
      <p className="text-white text-sm text-left font-thin">
        Track your order history, manage returns, and view details for each
        purchase.
      </p>
      {data?.orders?.length > 0 ? (
        <div className="flex flex-col gap-1 mt-4">
          <div className="flex full-w gap-4 border-2 border-stone-200 text-white shadow-xl rounded-lg px-4 py-2">
            <div className="flex-[4] text-sm p-1 w-full">Order ID</div>
            <div className="flex-[1] text-sm text-center p-1 w-full">Items</div>
            <div className="flex-[2] text-sm text-center p-1 w-full">Total</div>
            <div className="flex-[3] text-sm text-center p-1 w-full">Date</div>
            <div className="flex-[1] text-sm text-center p-1 w-full">Paid</div>
            <div className="flex-[1] text-sm text-right p-1 pr-2 w-full">
              Delivered
            </div>
          </div>

          {data?.orders.map((order, index) => (
            <div
              key={index}
              className={`${
                index % 2 ? "bg-white" : "bg-stone-100 shadow-lg"
              } border-slate-100 border-2 rounded-xl p-4 w-full text-left`}
            >
              <Link className="flex gap-4" to={`/orders/${order._id}`}>
                <div
                  className={`${
                    order.orderStatus === "cancelled" ? "text-red-500 " : ""
                  }flex-[4] text-sm p-1 w-full`}
                >
                  {order._id}
                </div>
                <div className="flex-[1] text-sm p-1 w-full text-center">
                  {order.orderItems.length}
                </div>
                <div className="flex-[2] text-sm text-center p-1 w-full">
                  ${order.totalPrice.toFixed(2)}
                </div>
                <div className="flex-[3] text-sm text-center p-1 w-full">
                  {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}
                </div>
                <div className="flex-[1] flex justify-center p-1 w-full">
                  {order.isPaid ? (
                    <FaCheck color="green" size={24} />
                  ) : (
                    <RiCloseLargeFill color="red" size={24} />
                  )}
                </div>
                <div className="flex-[1] flex justify-center p-1 w-full">
                  {order.isDelivered ? (
                    <FaCheck color="green" size={24} />
                  ) : (
                    <RiCloseLargeFill color="red" size={24} />
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>NO ORDERS YET</p>
      )}
      <div className="bg-white border-slate-100 border-2 rounded-xl mt-2 p-2 shadow-lg">
        <CustomPagination
          pages={data?.pages}
          page={Number(data?.page) || 1}
          setPage={handlePageChange}
        />
      </div>
    </Settings>
  );
};

export default OrdersList;
