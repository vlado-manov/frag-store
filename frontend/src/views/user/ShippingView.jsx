import React, { useEffect, useState } from "react";
import Container from "../../components/layout/Container";
import CheckoutStepper from "../../components/CheckoutStepper";
import { TextField } from "@mui/material";
import { useGetProfileQuery } from "../../slices/userSlice";
import Loader from "../../components/ux/Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../slices/cartSlice";
import CheckoutCart from "../../components/CheckoutCart";

const ShippingView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    country: "",
    isPrimary: false,
  });

  const { data: user, isLoading } = useGetProfileQuery();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/sign-in");
    } else if (user && cart.cartItems.length === 0) {
      navigate("/products");
    }
    const savedAddress = JSON.parse(localStorage.getItem("shippingAddress"));
    if (savedAddress) {
      const matchingAddress = user?.addresses?.find(
        (address) =>
          address.addressLine1 === savedAddress.addressLine1 &&
          address.city === savedAddress.city &&
          address.postalCode === savedAddress.postalCode &&
          address.country === savedAddress.country
      );

      if (matchingAddress) {
        setSelectedAddress(matchingAddress);
      } else {
        setFormData(savedAddress);
      }
    }
  }, [user, cart.cartItems.length, isLoading, navigate]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setSelectedAddress(null);
  };

  const handleAddressSelection = (address) => {
    if (selectedAddress === address) {
      setSelectedAddress(null);
    } else {
      setSelectedAddress(address);
      setFormData({
        addressLine1: "",
        addressLine2: "",
        city: "",
        postalCode: "",
        country: "",
        isPrimary: false,
      });
    }
  };

  const submitAddress = async (e) => {
    e.preventDefault();

    const addressToSave = selectedAddress || formData;

    dispatch(saveShippingAddress(addressToSave));
    localStorage.setItem("shippingAddress", JSON.stringify(addressToSave));

    navigate("/payment");
  };
  const isFormValid =
    selectedAddress ||
    (formData.addressLine1 &&
      formData.city &&
      formData.postalCode &&
      formData.country);

  return (
    <Container>
      <CheckoutStepper step1 step2 />
      <div className="flex gap-2">
        <div className="w-full flex-[9]">
          {isLoading ? (
            <Loader />
          ) : user?.addresses?.length > 0 ? (
            <div className="border-slate-100 bg-stone-50 border-2 rounded-xl flex flex-col justify-center p-6 my-4">
              <h1 className="text-xl font-bold text-left my-1 w-full">
                Pick one of your addresses
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-4">
                {user.addresses.map((address, index) => (
                  <div
                    key={index}
                    onClick={() => handleAddressSelection(address)}
                    className={`bg-white rounded-xl p-6 border-2 relative hover:cursor-pointer ${
                      selectedAddress === address
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
                      <p className="text-sm font-roboto">
                        {address.postalCode}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <h4 className="text-sm font-bold">Address:</h4>
                      <p className="text-sm font-roboto">
                        {address.addressLine1}
                      </p>
                    </div>
                    {address.addressLine2 && (
                      <div className="flex gap-2">
                        <h4 className="text-sm font-bold">Additional info:</h4>
                        <p className="text-sm font-roboto">
                          {address.addressLine2}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={submitAddress}
                disabled={!isFormValid}
                className={`rounded py-2 px-4 my-1 mt-4 w-fit ${
                  isFormValid
                    ? "bg-black text-white"
                    : "bg-slate-200 text-slate-400 hover:cursor-not-allowed"
                }`}
              >
                Next Step
              </button>
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
            <div className="w-full flex gap-4">
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
              disabled={!isFormValid}
              className={`rounded py-2 px-4 my-1 mt-4 w-fit ${
                isFormValid
                  ? "bg-black text-white"
                  : "bg-slate-200 text-slate-400 hover:cursor-not-allowed"
              }`}
            >
              Next Step
            </button>
          </div>
        </div>
        {cart.cartItems.length > 0 && <CheckoutCart cart={cart} />}
      </div>
    </Container>
  );
};

export default ShippingView;
