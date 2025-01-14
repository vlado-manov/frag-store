import React from "react";
import Settings from "./Settings";
import { FaCheck } from "react-icons/fa6";
import { RiCloseLargeFill } from "react-icons/ri";
import { Pagination, Stack } from "@mui/material";

const OrdersList = () => {
  return (
    <Settings>
      <h1 className="text-2xl font-bold text-left my-1">Your Orders</h1>
      <p className="text-gray-600 text-sm text-left font-thin">
        Track your order history, manage returns, and view details for each
        purchase.
      </p>
      <div className="flex flex-col gap-1 mt-4">
        <div className="flex full-w gap-4 border-2 border-stone-200 rounded-xl px-4 py-2">
          <div className="flex-[3] text-sm p-1 w-full">Order ID</div>
          <div className="flex-[2] text-sm text-center p-1 w-full">Total</div>
          <div className="flex-[2] text-sm text-center p-1 w-full">Date</div>
          <div className="flex-[1] text-sm text-center p-1 w-full">Paid</div>
          <div className="flex-[1] text-sm text-right p-1 pr-2 w-full">
            Delivered
          </div>
        </div>
        <div className="border-slate-100 bg-stone-100 border-2 rounded-xl flex p-4 w-full text-left">
          <div className="flex-[3] text-sm p-1 w-full">43546547657</div>
          <div className="flex-[2] text-sm text-center p-1 w-full">$231.21</div>
          <div className="flex-[2] text-sm text-center p-1 w-full">
            11/04/2013 13:43
          </div>
          <div className="flex-[1] flex justify-center p-1 w-full">
            <FaCheck color="green" size={24} />
          </div>
          {/* <div className="flex-[3] flex items-center justify-center gap-2 p-1 w-full">
            <button className="p-2 rounded bg-stone-200">
              <FaEye size={16} color="black" />
            </button>
            <button className="p-2 rounded bg-sky-500">
              <FaEdit size={16} color="white" />
            </button>
            <button className="p-2 rounded bg-red-500">
              <RiDeleteBin5Fill size={16} color="white" />
            </button>
          </div> */}
          <div className="flex-[1] flex justify-center p-1 w-full">
            <RiCloseLargeFill color="red" size={24} />
          </div>
        </div>
        <div className="border-slate-100 bg-white border-2 rounded-xl flex p-4 w-full text-left">
          <div className="flex-[3] text-sm p-1 w-full">43546547657</div>
          <div className="flex-[2] text-sm text-center p-1 w-full">$231.21</div>
          <div className="flex-[2] text-sm text-center p-1 w-full">
            11/04/2013 13:43
          </div>
          <div className="flex-[1] flex justify-center p-1 w-full">
            <FaCheck color="green" size={24} />
          </div>
          <div className="flex-[1] flex justify-center p-1 w-full">
            <FaCheck color="green" size={24} />
          </div>
        </div>
        <div className="border-slate-100 bg-stone-100 border-2 rounded-xl flex p-4 w-full text-left">
          <div className="flex-[3] text-sm p-1 w-full">43546547657</div>
          <div className="flex-[2] text-sm text-center p-1 w-full">$231.21</div>
          <div className="flex-[2] text-sm text-center p-1 w-full">
            11/04/2013 13:43
          </div>
          <div className="flex-[1] flex justify-center p-1 w-full">
            <RiCloseLargeFill color="red" size={24} />
          </div>
          <div className="flex-[1] flex justify-center p-1 w-full">
            <RiCloseLargeFill color="red" size={24} />
          </div>
        </div>
        <div className="border-slate-100 bg-white border-2 rounded-xl flex p-4 w-full text-left">
          <div className="flex-[3] text-sm p-1 w-full">43546547657</div>
          <div className="flex-[2] text-sm text-center p-1 w-full">$231.21</div>
          <div className="flex-[2] text-sm text-center p-1 w-full">
            11/04/2013 13:43
          </div>
          <div className="flex-[1] flex justify-center p-1 w-full">
            <FaCheck color="green" size={24} />
          </div>
          <div className="flex-[1] flex justify-center p-1 w-full">
            <RiCloseLargeFill color="red" size={24} />
          </div>
        </div>
        <div className="my-6 w-full flex justify-center">
          <Stack spacing={2} fullwidth>
            <Pagination
              count={10}
              siblingCount={0}
              boundaryCount={1}
              showFirstButton
              showLastButton
            />
          </Stack>
        </div>
      </div>
    </Settings>
  );
};

export default OrdersList;
