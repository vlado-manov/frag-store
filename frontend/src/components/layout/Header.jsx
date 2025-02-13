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
              <Link to="/" style={headingTitleStyles} className="text-2xl">
                <span className="font-outfit uppercase font-bold">Frag</span>
                <span className="font-outfit font-thin">Store</span>
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

      <CustomDrawer
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        scrolled={scrolled}
      />
      {!isMobile && <SubHeader toggleDrawer={toggleDrawer} />}
      <CartSync />
    </>
  );
};

export default Header;
