import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/poppins";
import "@fontsource/raleway";
import "@fontsource/roboto";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import ScrollToTop from "./components/ux/ScrollToTop.jsx";
import DropDownContextProvider from "./context/DropDrownContext/DropDownContextProvider.jsx";

function App() {
  return (
    <>
      <DropDownContextProvider>
        <Header />
        <ScrollToTop />
        <Outlet />
        <Footer />
        <ToastContainer />
      </DropDownContextProvider>
    </>
  );
}

export default App;
