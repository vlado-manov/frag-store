import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../slices/authSlice";
import { clearLocalWishlist } from "../../slices/wishlistSlice";
import { clearCartItems } from "../../slices/cartSlice";
import { useLogoutMutation } from "../../slices/userSlice";

const ProfileDropdown = ({ anchorEl, handleMenuClose, openMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(clearLocalWishlist());
      dispatch(clearCartItems());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {userInfo ? (
        <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
          <Link to="/profile">
            <MenuItem
              sx={{ color: "#313131", fontSize: 14, padding: "5px 16px" }}
              onClick={handleMenuClose}
            >
              Profile
            </MenuItem>
          </Link>
          <Link to="/orders">
            <MenuItem
              sx={{ color: "#313131", fontSize: 14, padding: "5px 16px" }}
              onClick={handleMenuClose}
            >
              My orders
            </MenuItem>
          </Link>
          <MenuItem
            sx={{ color: "#313131", fontSize: 14, padding: "5px 16px" }}
            onClick={logoutHandler}
          >
            Logout
          </MenuItem>
        </Menu>
      ) : (
        <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
          <Link to="/login">
            <MenuItem
              sx={{ color: "#313131", fontSize: 14, padding: "5px 16px" }}
              onClick={handleMenuClose}
            >
              Sign In
            </MenuItem>
          </Link>
          <Link to="/register">
            <MenuItem
              sx={{ color: "#313131", fontSize: 14, padding: "5px 16px" }}
              onClick={logoutHandler}
            >
              Sign Up
            </MenuItem>
          </Link>
        </Menu>
      )}
    </>
  );
};

export default ProfileDropdown;
