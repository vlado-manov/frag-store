import React, { useState } from "react";
import { Dialog } from "@mui/material";
import Slide from "@mui/material/Slide";
import { PiWarningCircleFill } from "react-icons/pi";
import CustomButton from "../ui/CustomButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ConfirmCancellationOrder = ({ cancelHandler }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    cancelHandler();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <CustomButton onClick={handleClickOpen} variant="alert" tw="px-6 text-sm">
        Cancel order
      </CustomButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <div className="pt-8 pb-4 px-4">
          <PiWarningCircleFill size={180} className="text-slate-200 m-auto" />

          <h1 className="text-4xl font-bold text-center pb-4 px-6">
            Are you sure you want to cancel this order?
          </h1>
          <div className="flex gap-4 justify-center w-full pb-6">
            <CustomButton onClick={handleCancel} variant="alert" tw="px-6">
              Yes, cancel the order
            </CustomButton>
            <CustomButton onClick={handleClose} variant="secondary" tw="px-6">
              No, go back
            </CustomButton>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ConfirmCancellationOrder;
