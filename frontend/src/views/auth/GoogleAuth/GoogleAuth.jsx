import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleAuthButton = () => {
  const handleGoogleSuccess = async (response) => {
    const { credential } = response;
    console.log("credentila", credential);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        token: credential,
      });
      console.log("User Info:", res.data);
      // Handle user data, such as saving to state or redirecting
    } catch (error) {
      console.error("Error during Google authentication:", error);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login failed:", error);
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleFailure}
      />
    </div>
  );
};

export default GoogleAuthButton;
