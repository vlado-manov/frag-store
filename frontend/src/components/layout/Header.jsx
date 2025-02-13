import React, { useEffect, useState } from "react";
import { AppBar, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import CartSync from "../../utils/CartSync";
import CustomDrawer from "./Drawer";
import HeaderOptions from "./HeaderOptions";
import ProfileDropdown from "./ProfileDropdown";
import SearchHeader from "./SearchHeader";
import SubHeader from "./SubHeader";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 96) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  // const appBarStyles = {
  //   transition: "all 0.2s ease-in-out",
  //   background: scrolled
  //     ? "linear-gradient(10deg, #0ea5e9 0%, #6366f1 50%, #f43f5e 100%)"
  //     : "rgba(255,255,255,1)",
  //   boxShadow: scrolled
  //     ? "0px 4px 10px rgba(0, 0, 0, 0.3)"
  //     : "0 2px 45px rgba(0,0,0,0.1)",
  //   padding: scrolled ? "0 16px" : "0 16px 8px 16px",
  // };

  const headingTitleStyles = {
    textDecoration: "none",
    color: `${scrolled ? "white" : "black"}`,
    fontWeight: `${scrolled ? "normal" : "bold"}`,
    marginLeft: isMobile ? 1 : 2,
  };

  return (
    <>
      <AppBar
        position={scrolled ? "sticky" : "relative"}
        className={`header ${scrolled ? "scrolled" : "placedTop"}`}
      >
        <div className="flex items-center gap-2 px-2 w-full flex-col sm:flex-row">
          <div className="flex items-stretch flex-[3] sm:items-center w-full sm:py-4">
            <div className="flex items-center flex-[6]">
              {isMobile && (
                <IconButton
                  color={`${scrolled ? "inherit" : "black"}`}
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Link to="/" style={headingTitleStyles}>
                FragStore
              </Link>
            </div>
            {isMobile && (
              <HeaderOptions
                handleMenuOpen={handleMenuOpen}
                flexResp={"flex-[6]"}
                scrolled={scrolled}
              />
            )}
          </div>
          <SearchHeader scrolled={scrolled} />
          {!isMobile && (
            <HeaderOptions
              handleMenuOpen={handleMenuOpen}
              flexResp={"flex-[3]"}
              scrolled={scrolled}
            />
          )}
        </div>
      </AppBar>

      <ProfileDropdown
        handleMenuClose={handleMenuClose}
        anchorEl={anchorEl}
        openMenu={openMenu}
      />

      <CustomDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      {!isMobile && <SubHeader toggleDrawer={toggleDrawer} />}
      <CartSync />
    </>
  );
};

export default Header;
