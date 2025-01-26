import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "@fontsource/roboto";
import "@fontsource/poppins";
import "@fontsource/raleway";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import ScrollToTop from "./components/ux/ScrollToTop.jsx";
import GoogleAuthButton from "./views/auth/GoogleAuth/GoogleAuth.jsx";

function App() {
  return (
    <>
      <GoogleOAuthProvider
        clientId={
          "507960835054-69nc0pi2976h0kch1976t972al85hek4.apps.googleusercontent.com"
        }
      >
        <Header />
        <ScrollToTop />
        <Outlet />
        <Footer />
        <ToastContainer />
        <GoogleAuthButton />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
