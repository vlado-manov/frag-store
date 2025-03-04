import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { LiaCcAmex } from "react-icons/lia";
import { FaCcPaypal } from "react-icons/fa";
import Slide from "@mui/material/Slide";
import CustomButton from "../ui/CustomButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const SelectPaymentModal = ({ paymentMethod, onSave }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelectedMethod(paymentMethod);
  }, [paymentMethod]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (selectedMethod !== paymentMethod) {
      onSave(selectedMethod);
    }
    setOpen(false);
  };

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
  };
  return (
    <>
      <CustomButton
        tw="block mb-2 px-6 py-3 w-full"
        variant="secondary"
        onClick={handleClickOpen}
      >
        Change payment method
      </CustomButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <div className="pt-8 pb-4">
          <h1 className="text-2xl font-bold text-left pb-4 px-6 border-b-2 border-slate-200">
            Select payment method
          </h1>
          <div className="px-6">
            <div
              className={`rounded-lg my-2 border-2 ${
                selectedMethod === "creditCard"
                  ? "border-sky-500"
                  : "border-slate-100 hover:border-sky-300"
              } flex items-center justify-between bg-white p-4 hover:cursor-pointer w-96`}
              onClick={() => handleSelectMethod("creditCard")}
            >
              <h1 className="text-lg font-bold m-0">Credit Card</h1>
              <div className="flex items-center gap-2">
                <FaCcVisa size={32} />
                <FaCcMastercard size={32} />
                <LiaCcAmex size={32} />
              </div>
            </div>
            <div
              className={`rounded-lg border-2 ${
                selectedMethod === "paypal"
                  ? "border-sky-500"
                  : "border-slate-100 hover:border-sky-300"
              } flex items-center justify-between bg-white p-4 hover:cursor-pointer`}
              onClick={() => handleSelectMethod("paypal")}
            >
              <h1 className="text-lg font-bold m-0">Paypal</h1>
              <div className="flex items-center gap-2">
                <FaCcPaypal size={32} />
              </div>
            </div>
          </div>
          <div className="border-t-2 border-slate-200 px-6 pt-4 mt-6">
            <CustomButton
              tw="text-lg w-full block"
              onClick={handleSave}
              disabled={!selectedMethod}
            >
              Save payment
            </CustomButton>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SelectPaymentModal;
