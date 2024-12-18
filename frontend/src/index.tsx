import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import Home from "./views/pages/Home";
import CategoryView from "./views/pages/CategoryView";
import ProductView from "./views/pages/ProductView";
import BrandView from "./views/pages/BrandView";
import ProductsList from "./views/pages/ProductsList";
import WishList from "./views/user/WishList";
import Profile from "./views/user/Profile";
import Cart from "./views/user/Cart";
import OrdersList from "./views/user/OrdersList";
import OrderView from "./views/user/OrderView";
import PaymentView from "./views/user/PaymentView";
import PlaceOrder from "./views/user/PlaceOrder";
import ShippingView from "./views/user/ShippingView";
import SignIn from "./views/auth/SignIn";
import SignUp from "./views/auth/SignUp";
import RecoverPassword from "./views/auth/RecoverPassword";
import { lightTheme } from "./styles/theme";
import PrivateRoute from "./routes/PrivateRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/products" element={<ProductsList />} />
      <Route path="/products/page/:pageNumber" element={<ProductsList />} />
      <Route path="/products/:id" element={<ProductView />} />
      <Route path="/brands/:brand" element={<BrandView />} />
      <Route path="/brands/:brand/page/:pageNumber" element={<BrandView />} />
      <Route path="/category/:category" element={<CategoryView />} />
      <Route
        path="/category/:category/page/:pageNumber"
        element={<CategoryView />}
      />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<WishList />} />
      <Route path="/wishlist/page/:pageNumber" element={<WishList />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/recoverpassword" element={<RecoverPassword />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<OrdersList />} />
        <Route path="/orders/page/:pageNumber" element={<OrdersList />} />
        <Route path="/order/:id" element={<OrderView />} />
        <Route path="/shipping" element={<ShippingView />} />
        <Route path="/payment" element={<PaymentView />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
      </Route>
      {/* TODO: Place admin routes */}
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
