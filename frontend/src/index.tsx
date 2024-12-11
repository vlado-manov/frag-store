import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./views/Home";
import CategoryView from "./views/CategoryView";
import ProductView from "./views/ProductView";
import BrandView from "./views/BrandView";
import ProductsList from "./views/ProductsList";
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
      {/* TODO: Make private */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<OrdersList />} />
      <Route path="/orders/page/:pageNumber" element={<OrdersList />} />
      <Route path="/order/:id" element={<OrderView />} />
      <Route path="/shipping" element={<ShippingView />} />
      <Route path="/payment" element={<PaymentView />} />
      <Route path="/placeorder" element={<PlaceOrder />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);