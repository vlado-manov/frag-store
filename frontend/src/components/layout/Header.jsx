import React, { useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  InputBase,
  Menu,
  MenuItem,
  Drawer,
  Box,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Favorite,
  ShoppingCart,
  AccountCircle,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/userSlice";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import { useSelector } from "react-redux";
import { TiThMenu } from "react-icons/ti";
import useScrollOnDrag from "react-scroll-ondrag";
import { useQuery } from "@apollo/client";
import {
  GET_BRANDS,
  GET_CATEGORIES,
  GET_TOP_BRANDS,
} from "../../graphql/queries";

const theme = createTheme({
  palette: {
    primary: {
      main: "#512966",
    },
    secondary: {
      main: "#ff5722",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

const Header = () => {
  const { data: categoriesData } = useQuery(GET_CATEGORIES);
  const { data: brandsData, loading } = useQuery(GET_BRANDS);
  const { data: topBrandsData } = useQuery(GET_TOP_BRANDS);
  const containerRef = useRef(null);
  const { events } = useScrollOnDrag(containerRef, {});
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const openMenu = Boolean(anchorEl);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchText);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky">
        <Toolbar
          sx={{
            background:
              // "linear-gradient(10deg, #2e0145 0%, #2d1e2d 50%, #171717 100%)",
              // "linear-gradient(10deg, #bae6fd 0%, #c7d2fe 50%, #fecdd3 100%)",
              "linear-gradient(10deg, #0ea5e9 0%, #6366f1 50%, #f43f5e 100%)",
          }}
        >
          <div className="flex items-center gap-2 px-2 py-4 w-full flex-col sm:flex-row">
            <div className="flex items-stretch flex-[3] sm:items-center w-full">
              <div className="flex items-center flex-[6]">
                {isMobile && (
                  <IconButton
                    color="inherit"
                    onClick={toggleDrawer(true)}
                    sx={{ color: "white" }}
                  >
                    <MenuIcon />
                  </IconButton>
                )}
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    marginLeft: isMobile ? 1 : 2,
                  }}
                >
                  FragStore
                </Link>
              </div>
              <div className="flex flex-[6] justify-end items-center sm:hidden">
                <IconButton color="inherit">
                  <Favorite />
                </IconButton>
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="error">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
                <div
                  className="hover:cursor-pointer hover:bg-opacity-10 hover:bg-gray-900 rounded p-2 flex items-center justify-center gap-1"
                  onClick={handleMenuOpen}
                >
                  <AccountCircle />
                  {userInfo ? (
                    <span className="text-sm">{userInfo.name}</span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center flex-[12] sm:flex-[6] w-full">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  width: "100%",
                  "&:focus-within .search-icon": {
                    color: "black",
                  },
                }}
              >
                <InputBase
                  placeholder="Search…"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  startAdornment={
                    <IconButton
                      onClick={handleSearch}
                      sx={{
                        color: "white",
                      }}
                    >
                      <SearchIcon className="search-icon" />
                    </IconButton>
                  }
                  sx={{
                    width: "100%",
                    padding: "0 16px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "4px",
                    "&:focus-within": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                      color: "#000",
                      outline: "none",
                    },
                    maxWidth: "500px",
                  }}
                />
              </Box>
            </div>
            <div className="items-center flex-[3] justify-end sm:flex hidden">
              <IconButton color="inherit">
                <Favorite />
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <div
                className="hover:cursor-pointer hover:bg-opacity-10 hover:bg-gray-900 rounded p-2 flex items-center justify-center gap-1"
                onClick={handleMenuOpen}
              >
                <AccountCircle />
                {userInfo ? (
                  <span className="text-sm">{userInfo.name}</span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>

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

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          width: 300,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 300,
            backgroundColor: "#fff",
            color: "#000",
            transition: "transform 0.3s ease-in-out",
          },
        }}
      >
        <div className="px-5 py-10">
          <h2 className="text-lg text-black uppercase">Categories</h2>
          <hr className="border-gray-400 my-1" />
          <div className="p-2 flex flex-col">
            {categoriesData?.categories?.map((category, index) => (
              <Link
                key={index}
                to={`/products/categories/${category}`}
                onClick={toggleDrawer(false)}
              >
                <p className="py-1 capitalize hover:text-gray-700">
                  - {category}
                </p>
              </Link>
            ))}
            <h2 className="text-lg text-black uppercase mt-5">For</h2>
            <hr className="border-gray-400 my-1" />
            <Link
              to={`/products/categories/designer`}
              onClick={toggleDrawer(false)}
            >
              <p className="py-1 hover:text-gray-700">- Male</p>
            </Link>
            <Link
              to={`/products/categories/niche`}
              onClick={toggleDrawer(false)}
            >
              <p className="py-1 hover:text-gray-700">- Female</p>
            </Link>
            <Link
              to={`/products/categories/arabic`}
              onClick={toggleDrawer(false)}
            >
              <p className="py-1 hover:text-gray-700">- Unisex</p>
            </Link>
            <h2 className="text-lg text-black uppercase mt-5">Top brands</h2>
            <hr className="border-gray-400 my-1" />
            {topBrandsData?.topBrands?.map((topBrand, index) => (
              <Link
                key={index}
                onClick={toggleDrawer(false)}
                to={`/products/brands/${topBrand
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/[^a-z0-9\s-]/gi, "")
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
              >
                <p key={index} className="py-1 hover:text-gray-700">
                  - {topBrand}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </Drawer>
      <div className="hidden sm:flex gap-6 items-center flex-row justify-start  bg-slate-50 py-0 px-2">
        <div
          className="flex items-center justify-center hover:cursor-pointer hover:bg-slate-200 py-2 text-gray-900 px-2 rounded"
          onClick={toggleDrawer(true)}
        >
          <TiThMenu className="text-black" size={20} />
          <p className="ml-2 text-sm font-bold uppercase">Categories</p>
        </div>
        <div
          className="flex overflow-hidden whitespace-nowrap gap-5 py-5"
          {...events}
          ref={containerRef}
        >
          {loading ? (
            <div className="h-5 flex gap-5">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="w-20 bg-slate-200 animate-pulse rounded"
                ></div>
              ))}
            </div>
          ) : (
            <>
              {brandsData?.brands?.slice(0, 25).map((brand, index) => (
                <div className="flex gap-5" key={index}>
                  <Link
                    key={index}
                    to={`/products/brands/${brand
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .replace(/[^a-z0-9\s-]/gi, "")
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`}
                  >
                    <p className="text-sm text-gray-500 font-mono w-max uppercase font-bold hover:text-gray-900">
                      {brand}
                    </p>
                  </Link>
                  <p className="text-gray-300 text-sm">/</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Header;
