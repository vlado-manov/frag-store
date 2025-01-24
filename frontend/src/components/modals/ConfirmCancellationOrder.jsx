import React, { useState } from "react";
import { Dialog } from "@mui/material";
import Slide from "@mui/material/Slide";
import { PiWarningCircleFill } from "react-icons/pi";

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
      <button
        type="button"
        className="text-white text-sm bg-red-500 py-2 px-6 rounded"
        onClick={handleClickOpen}
      >
        Cancel order
      </button>
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
            <button
              className="px-6 py-2 text-white bg-red-500 rounded"
              onClick={handleCancel}
            >
              Yes, cancel the order
            </button>
            <button
              className="px-6 py-2 text-black bg-slate-200 rounded"
              onClick={handleClose}
            >
              No, go back
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ConfirmCancellationOrder;
