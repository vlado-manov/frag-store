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
import store from "./store.js";
import App from "./App.js";
import Home from "./views/pages/Home.jsx";
import CategoryView from "./views/pages/CategoryView.jsx";
import ProductView from "./views/pages/ProductView.jsx";
import BrandView from "./views/pages/BrandView.jsx";
import ProductsList from "./views/pages/ProductsList.jsx";
import WishList from "./views/user/WishList.jsx";
import Profile from "./views/user/Profile.jsx";
import OrdersList from "./views/user/OrdersList.jsx";
import OrderView from "./views/user/OrderView.jsx";
import PaymentView from "./views/user/PaymentView.jsx";
import OrderSummary from "./views/user/OrderSummary.jsx";
import ShippingView from "./views/user/ShippingView.jsx";
import SignIn from "./views/auth/SignIn.jsx";
import SignUp from "./views/auth/SignUp.jsx";
import RecoverPassword from "./views/auth/RecoverPassword.jsx";
import { lightTheme } from "./styles/theme.js";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import Address from "./views/user/Address.jsx";
import Cart from "./views/pages/Cart.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/products" element={<ProductsList />} />
      <Route path="/products/page/:pageNumber" element={<ProductsList />} />
      <Route path="/products/:id" element={<ProductView />} />
      <Route path="/products/brands/:brand" element={<BrandView />} />
      <Route
        path="/products/brands/:brand/page/:pageNumber"
        element={<BrandView />}
      />
      <Route path="/products/categories/:category" element={<CategoryView />} />
      <Route
        path="/categories/:category/page/:pageNumber"
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
        <Route path="/address" element={<Address />} />
        <Route path="/orders" element={<OrdersList />} />
        <Route path="/orders/page/:pageNumber" element={<OrdersList />} />
        <Route path="/orders/:id" element={<OrderView />} />
        <Route path="/shipping" element={<ShippingView />} />
        <Route path="/payment" element={<PaymentView />} />
        <Route path="/summary" element={<OrderSummary />} />
      </Route>
      {/* TODO: Place admin routes */}
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
