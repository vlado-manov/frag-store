import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  InputBase,
  Menu,
  MenuItem,
  Typography,
  Drawer,
  Box,
  Tabs,
  Tab,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  Button,
  Grid,
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
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

  const handleTabChange = (e, newValue) => {
    setSelectedTab(newValue);
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
              "linear-gradient(10deg, #2e0145 0%, #2d1e2d 50%, #171717 100%)",
          }}
        >
          <Grid container alignItems="center" spacing={2} sx={{ padding: 1 }}>
            <Grid item xs={12} sm={3}>
              <Box display="flex" alignItems="center">
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
              </Box>
            </Grid>

            <Grid item xs={8} sm={6}>
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
            </Grid>

            <Grid item xs={4} sm={3}>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <IconButton color="inherit">
                  <Favorite />
                </IconButton>
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="error">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
                <IconButton color="inherit" onClick={handleMenuOpen}>
                  <AccountCircle />
                </IconButton>
                {userInfo ? <Typography>{userInfo.name}</Typography> : ""}
              </Box>
            </Grid>
          </Grid>
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
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            backgroundColor: "#333",
            color: "white",
            transition: "transform 0.3s ease-in-out",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Categories</Typography>
          <Divider sx={{ margin: "10px 0" }} />
          <List>
            <ListItemButton>
              <ListItemText primary="Category 1" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Category 2" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Category 3" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Category 4" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      <Box
        sx={{
          display: "none",
          padding: "10px",
          backgroundColor: "#fafafa",
          color: "#313131",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "row",
          "@media (min-width:600px)": { display: "flex" },
        }}
      >
        <IconButton
          color="inherit"
          onClick={toggleDrawer(true)}
          sx={{
            display: "flex",
            color: "#313131",
          }}
        >
          <MenuIcon />
        </IconButton>
        <Button sx={{ marginRight: 3 }} onClick={toggleDrawer(true)}>
          Categories
        </Button>

        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="secondary"
          textColor="inherit"
        >
          <Tab label="Brand 1" sx={{ fontSize: "12px" }} />
          <Tab label="Brand 2" sx={{ fontSize: "12px" }} />
          <Tab label="Brand 3" sx={{ fontSize: "12px" }} />
        </Tabs>
      </Box>
      <Box
        sx={{
          padding: "10px",
          background: isMobile
            ? "#221b22"
            : "linear-gradient(10deg, #171717 0%, #2d1e2d 50%, #2e0145 100%)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "white",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontSize: "12px", marginRight: 2 }}>
            Phone: +1 234 567 890
          </Typography>
          <Typography sx={{ fontSize: "12px" }}>
            Email: contact@mystore.com
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Header;
