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

const Address = () => {
  const [formData, setFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const { userInfo } = useSelector((state) => state.auth);
  const { data: user } = useGetProfileQuery();
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useUpdateProfileMutation();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitAddress = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        _id: userInfo._id,
        addresses: [
          ...(userInfo.addresses || []),
          {
            ...formData,
            isPrimary: userInfo.addresses?.length === 0,
          },
        ],
      };

      const res = await updateProfile(updatedData).unwrap();
      dispatch(setCredentials({ ...userInfo, ...res }));
      setFormData({
        addressLine1: "",
        addressLine2: "",
        city: "",
        postalCode: "",
        country: "",
      });
      toast.success("Data was updated successfully!");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  console.log("user is: ", user);
  console.log("userinfo is: ", userInfo);
  return (
    <Settings>
      <h1 className="text-2xl font-bold text-left my-1">Address</h1>
      <p className="text-gray-600 text-sm text-left font-thin">
        Manage your shipping and billing addresses for a smoother checkout
        experience.
      </p>
      <div className="border-slate-100 bg-stone-50 border-2 rounded-xl flex flex-col justify-center p-6 my-4">
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
            control={<Checkbox />}
            label="That's my primary address"
          />
        </div>
        <button
          onClick={submitAddress}
          className="bg-black rounded py-2 px-4 text-white my-1 mt-4 w-fit"
        >
          Add address
        </button>
      </div>
      <div className="border-slate-100 bg-stone-50 border-2 rounded-xl flex flex-col justify-center p-6 my-4">
        <h1 className="text-xl font-bold text-left my-1 w-full">
          Your addresses
        </h1>
        {user?.addresses?.length === 0 ? (
          <div>NO ADDRESS YET</div>
        ) : (
          <div className="grid grid cols-1 sm:grid-cols-2 mt-4 gap-4">
            {user?.addresses?.map((address, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 border-2 relative ${
                  address.isPrimary ? "border-sky-500" : "border-slate-100"
                }`}
              >
                <div className="flex gap-2">
                  <h4 className="text-sm font-bold">Country:</h4>
                  <p className="text-sm font-roboto">
                    {address.country}
                    {address.isPrimary ? "KOOO" : "NEEEE"}
                  </p>
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
                <div className="flex py-2 absolute top-4 right-4">
                  <button className="rounded bg-red-500 p-2">
                    <RiDeleteBin5Fill color="white" size={20} />
                  </button>
                </div>
                <button
                  className={`rounded px-4 py-2 text-sm mt-2 ${
                    address.isPrimary ? "bg-sky-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {address.isPrimary ? "Primary" : "Make Primary"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Settings>
  );
};

export default Address;
