import React, { useState } from "react";
import Settings from "./Settings";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../slices/userSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Loader from "../../components/ux/Loader";
import CustomButton from "../../components/ui/CustomButton";

const Address = () => {
  const [formData, setFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    country: "",
    isPrimary: false,
  });
  const { userInfo } = useSelector((state) => state.auth);
  const { data: user, isLoading, refetch } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submitAddress = async (e) => {
    e.preventDefault();
    try {
      const updatedAddresses = user.addresses.map((addr) => ({
        ...addr,
        isPrimary: formData.isPrimary ? false : addr.isPrimary,
      }));
      const newAddress = { ...formData, isPrimary: formData.isPrimary };
      updatedAddresses.push(newAddress);
      const updatedData = { ...userInfo, addresses: updatedAddresses };
      const res = await updateProfile(updatedData).unwrap();
      setFormData({
        addressLine1: "",
        addressLine2: "",
        city: "",
        postalCode: "",
        country: "",
        isPrimary: false,
      });
      refetch();
      toast.success("Data was updated successfully!");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const makePrimary = async (index) => {
    try {
      const updatedAddresses = user.addresses.map((addr, idx) => ({
        ...addr,
        isPrimary: idx === index,
      }));

      const updatedData = { ...userInfo, addresses: updatedAddresses };
      const res = await updateProfile(updatedData).unwrap();
      dispatch(setCredentials({ ...userInfo, ...res }));
      refetch();
      toast.success("Primary address updated!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update address!");
    }
  };

  const deleteAddress = async (index) => {
    try {
      const updatedAddresses = user.addresses.filter((_, idx) => idx !== index);
      const updatedData = { ...userInfo, addresses: updatedAddresses };
      const res = await updateProfile(updatedData).unwrap();
      dispatch(setCredentials({ ...userInfo, ...res }));
      refetch();
      toast.success("Address deleted!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete address!");
    }
  };

  return (
    <Settings>
      <h1 className="text-2xl text-white font-bold text-left my-1">Address</h1>
      <p className="text-white text-sm text-left font-thin">
        Manage your shipping and billing addresses for a smoother checkout
        experience.
      </p>
      <div className="border-slate-100 bg-white shadow-lg border-2 rounded-xl flex flex-col justify-center p-6 my-4">
        <h1 className="text-xl font-bold text-left my-1 w-full">
          Add a new address
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
        <div className="p-2">
          <FormControlLabel
            control={
              <Checkbox
                name="isPrimary"
                checked={formData.isPrimary}
                onChange={handleChange}
              />
            }
            label="Set as my primary address"
          />
        </div>
        <CustomButton onClick={submitAddress} tw="my-1 mt-4 w-fit">
          Add address
        </CustomButton>
      </div>
      <div className="border-slate-100 bg-white shadow-lg border-2 rounded-xl flex flex-col justify-center p-6 my-4">
        <h1 className="text-xl font-bold text-left my-1 w-full">
          Your addresses
        </h1>
        {isLoading ? (
          <Loader />
        ) : user.addresses?.length === 0 ? (
          <div>
            You haven't added any addresses yet. Add a new address to make your
            checkout experience smoother!
          </div>
        ) : (
          <div className="grid grid cols-1 sm:grid-cols-2 mt-4 gap-4">
            {user.addresses?.map((address, index) => (
              <div
                key={index}
                className={`bg-stone-50 rounded-xl p-6 border-2 relative ${
                  address.isPrimary ? "border-sky-500" : "border-slate-100"
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
                  ""
                ) : (
                  <div className="flex py-2 absolute top-4 right-4">
                    <CustomButton
                      variant="alert"
                      tw="px-2"
                      onClick={() => deleteAddress(index)}
                    >
                      <RiDeleteBin5Fill color="white" size={20} />
                    </CustomButton>
                  </div>
                )}
                {address.isPrimary ? (
                  <CustomButton variant="primary" tw="text-sm mt-2">
                    Primary
                  </CustomButton>
                ) : (
                  <CustomButton
                    variant="secondary"
                    tw="text-sm mt-2"
                    onClick={() => makePrimary(index)}
                  >
                    Make primary
                  </CustomButton>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Settings>
  );
};

export default Address;
