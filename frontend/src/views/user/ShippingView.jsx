import React, { useState } from "react";
import Container from "../../components/layout/Container";
import CheckoutStepper from "../../components/CheckoutStepper";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../slices/userSlice";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Loader from "../../components/ux/Loader";
import { Link } from "react-router-dom";

const ShippingView = () => {
  const [formData, setFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    country: "",
    isPrimary: false,
  });
  const { data: user, isLoading, refetch } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const submitAddress = async (e) => {
    e.preventDefault();
  };
  return (
    <Container>
      <CheckoutStepper step1 step2 />
      {isLoading ? (
        <Loader />
      ) : user?.addresses?.length > 0 ? (
        <div className="border-slate-100 bg-stone-50 border-2 rounded-xl flex flex-col justify-center p-6 my-4">
          <h1 className="text-xl font-bold text-left my-1 w-full">
            Pick one of you addresses
          </h1>
          <div className="grid grid cols-1 sm:grid-cols-2 mt-4 gap-4">
            {user.addresses?.map((address, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 border-2 relative hover:cursor-pointer  ${
                  address.isPrimary
                    ? "border-sky-500"
                    : "border-slate-100 hover:border-sky-300"
                }`}
              >
                <div className="flex gap-2">
                  <h4 className="text-sm font-bold">Country:</h4>
                  <p className="text-sm font-roboto">{address.country}</p>
                </div>
                <div className="flex gap-2">
                  <h4 className="text-sm font-bold">City:</h4>
                  <p className="text-sm font-roboto">{address.city}</p>
                </div>
                <div className="flex gap-2">
                  <h4 className="text-sm font-bold">Postal Code:</h4>
                  <p className="text-sm font-roboto">{address.postalCode}</p>
                </div>
                <div className="flex gap-2">
                  <h4 className="text-sm font-bold">Address:</h4>
                  <p className="text-sm font-roboto">{address.addressLine1}</p>
                </div>
                {address.addressLine2 && (
                  <div className="flex gap-2">
                    <h4 className="text-sm font-bold">Additional info:</h4>
                    <p className="text-sm font-roboto">
                      {address.addressLine2}
                    </p>
                  </div>
                )}
                {address.isPrimary ? (
                  <button className="rounded px-4 py-2 text-sm mt-2 bg-sky-500 text-white">
                    Selected
                  </button>
                ) : (
                  <button
                    className="rounded px-4 py-2 text-sm mt-2 bg-gray-200"
                    // onClick={() => makePrimary(index)}
                  >
                    Select
                  </button>
                )}
              </div>
            ))}
          </div>
          <Link to="/payment">
            <button
              // onClick={submitAddress}
              className="bg-black rounded py-2 px-4 text-white my-1 mt-4 w-fit"
            >
              Next Step
            </button>
          </Link>
        </div>
      ) : (
        ""
      )}
      <div className="border-slate-100 bg-stone-50 border-2 rounded-xl flex flex-col justify-center p-6 my-4">
        <h1 className="text-xl font-bold text-left my-1 w-full">
          {user?.addresses?.length > 0
            ? "...Or add a new address"
            : "Add your address"}
        </h1>
        <div className="w-full flex gap-4 py-2">
          <TextField
            name="country"
            value={formData.country}
            onChange={handleChange}
            label="Country"
            variant="outlined"
            required
          />
          <TextField
            name="city"
            value={formData.city}
            onChange={handleChange}
            label="City"
            variant="outlined"
            required
          />
          <TextField
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            label="Postal code"
            variant="outlined"
            required
          />
        </div>
        <div className="w-1/2 flex gap-4">
          <TextField
            fullWidth
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            label="Address Line 1"
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            label="Address Line 2"
            variant="outlined"
          />
        </div>
        <button
          onClick={submitAddress}
          className="bg-black rounded py-2 px-4 text-white my-1 mt-4 w-fit"
        >
          Next Step
        </button>
      </div>
    </Container>
  );
};

export default ShippingView;
