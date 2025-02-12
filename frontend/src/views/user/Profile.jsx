import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../slices/userSlice";
import Loader from "../../components/ux/Loader";
import Settings from "./Settings";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import { z } from "zod";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import CustomButton from "../../components/ui/CustomButton";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Za-z]/, "Password must include Latin letters")
  .regex(/\d/, "Password must include a digit")
  .regex(/[!?@#$%^&*]/, "Password must include a special character")
  .regex(
    /^[A-Za-z0-9!?@#$%^&*]+$/,
    "Password must only contain Latin letters, numbers, and special characters"
  );

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    // image: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const dispatch = useDispatch();

  const { data: profile, refetch } = useGetProfileQuery();
  const { userInfo, isLoading, isError } = useSelector((state) => state.auth);

  const [updateProfile] = useUpdateProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || "",
        email: userInfo.email || "",
        // image: userInfo.image || "",
        password: "",
        confirmPassword: "",
        phone: userInfo.phone || "",
      });
    }
  }, [userInfo]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitUpdate = async (e) => {
    e.preventDefault();

    if (formData.password) {
      try {
        passwordSchema.parse(formData.password);
      } catch (err) {
        toast.error(err.errors[0].message);
        return;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const updatedData = {
        _id: profile?._id,
        name: formData.name,
        email: formData.email,
        // image: formData.image,
        phone: formData.phone,
        password: formData.password ? formData.password : undefined,
      };

      const res = await updateProfile(updatedData).unwrap();
      dispatch(setCredentials({ ...userInfo, ...res }));
      refetch();
      toast.success("Data was updated successfully!");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <p>Failed to load profile.</p>;

  return (
    <Settings>
      <h1 className="text-2xl text-white font-bold text-left my-1">
        User profile
      </h1>
      <p className="text-white text-sm text-left font-thin">
        Manage your details, view your orders status and change your password.
      </p>
      <div className="flex gap-5 mt-4">
        <div className="border-slate-100 bg-white shadow-xl border-2 rounded-xl flex flex-col items-center justify-center p-6 min-w-64">
          {profile?.image ? (
            <img
              src={profile?.image}
              alt="Profile"
              className="object-contain rounded-full w-24"
            />
          ) : (
            <div className="rounded-full w-24 h-24 bg-sky-500 relative">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-white">
                {profile?.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <h2 className="my-1 text-black font-bold">{profile?.name}</h2>
          {profile?.phone && (
            <h3 className="text-xs text-gray-700">{profile.phone}</h3>
          )}
          <CustomButton tw="my-1">Change profile image</CustomButton>
        </div>
        <div className="border-slate-100 bg-white shadow-xl border-2 p-6 rounded-xl w-full">
          <h1 className="text-xl font-bold text-left my-1 w-full">
            General Information
          </h1>
          <div className="w-full flex flex-col gap-8 py-4">
            <TextField
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              label="Name"
              variant="outlined"
            />
            <TextField
              fullWidth
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              label="Phone"
              variant="outlined"
            />
          </div>
          <CustomButton tw="my-1" onClick={submitUpdate}>
            Update
          </CustomButton>
        </div>
      </div>
      <div className="border-slate-100 bg-white shadow-xl border-2 p-6 rounded-xl w-full mt-6">
        <h1 className="text-xl font-bold text-left my-1 w-full">Security</h1>
        <div className="w-full flex gap-2 py-4">
          <TextField
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
            label="Email"
            variant="outlined"
          />
          <div className="relative w-full">
            <TextField
              fullWidth
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              label="New password"
              variant="outlined"
            />
            <div
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={handleClickShowPassword}
            >
              {showPassword ? (
                <FaEye
                  color="#996f99"
                  size={30}
                  className="p-1 rounded-full hover:bg-gray-200 hover:cursor-pointer"
                />
              ) : (
                <FaEyeSlash
                  color="#996f99"
                  size={30}
                  className="p-1 rounded-full hover:bg-gray-200 hover:cursor-pointer"
                />
              )}
            </div>
          </div>
          <div className="relative w-full">
            <TextField
              fullWidth
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              label="Confirm password"
              variant="outlined"
            />
            <div
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={handleClickShowPassword}
            >
              {showPassword ? (
                <FaEye
                  color="#996f99"
                  size={30}
                  className="p-1 rounded-full hover:bg-gray-200 hover:cursor-pointer"
                />
              ) : (
                <FaEyeSlash
                  color="#996f99"
                  size={30}
                  className="p-1 rounded-full hover:bg-gray-200 hover:cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
        <CustomButton tw="my-1" onClick={submitUpdate}>
          Update
        </CustomButton>
      </div>
    </Settings>
  );
};

export default Profile;
