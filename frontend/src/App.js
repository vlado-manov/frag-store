import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/poppins";
import "@fontsource/raleway";
import "@fontsource/roboto";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
