import { AccountCircle, Favorite } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import CartDropdown from "./CartDropdown";
import { useGetWishListProductsQuery } from "../../slices/wishlistApiSlice";
import { useSelector } from "react-redux";

const HeaderOptions = ({ handleMenuOpen, flexResp, scrolled }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: wishlistServer } = useGetWishListProductsQuery();
  const wishlistLength = wishlistServer?.products.length;

  return (
    <div className={`flex items-center justify-end pt-2 sm:py-2 ${flexResp}`}>
      <Link to="/wishlist">
        <IconButton
          sx={{
            color: scrolled ? "inherit" : "#f43f5e",
            padding: "12px",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.05)",
            },
          }}
        >
          <Badge
            badgeContent={wishlistLength}
            sx={{
              ".MuiBadge-badge": {
                backgroundColor: `${scrolled ? "#f43f5e" : "#313131"}`,
                color: "white",
              },
            }}
          >
            <Favorite />
          </Badge>
        </IconButton>
      </Link>
      <CartDropdown scrolled={scrolled} />
      <div
        className="rounded-full hover:cursor-pointer hover:bg-opacity-10 hover:bg-gray-500 p-[2px] md:p-2 flex items-center justify-center gap-1"
        onClick={handleMenuOpen}
      >
        {userInfo ? (
          <>
            {userInfo.image ? (
              <div className="rounded-full w-4 h-4 bg-lime-400"></div>
            ) : (
              <AccountCircle sx={{ color: scrolled ? "white" : "#313131" }} />
            )}
            <span className={`${!scrolled && "text-black "}text-sm`}>
              {userInfo.name}
            </span>
          </>
        ) : (
          <>
            <span className={`${!scrolled && "text-black "}text-sm`}>
              Sign in
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderOptions;
