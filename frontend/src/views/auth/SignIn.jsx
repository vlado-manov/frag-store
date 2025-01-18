import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  Link as MuiLink,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../slices/userSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import {
  useGetWishListProductsQuery,
  useSyncWishlistToServerMutation,
} from "../../slices/wishlistApiSlice";
import {
  clearLocalWishlist,
  loadWishlistFromLocalStorage,
} from "../../slices/wishlistSlice";
import Message from "../../components/ux/Message";
import { FaSquareFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [submitError, setSubmitError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [syncWish] = useSyncWishlistToServerMutation();
  const redirect = "/";
  const {
    data: serverWishlist,
    isLoading,
    refetch,
  } = useGetWishListProductsQuery();

  useEffect(() => {
    if (!serverWishlist || isLoading) return;

    if (serverWishlist?.products?.length > 0) {
      localStorage.setItem("wishlist", JSON.stringify(serverWishlist.products));
      dispatch(loadWishlistFromLocalStorage());
    }
    if (loginSuccess && !isLoading) {
      navigate(redirect);
    }
  }, [serverWishlist, loginSuccess, isLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      const err = formData.email ? "Password is required" : "Email is required";
      setSubmitError(err);
      return;
    }

    try {
      const res = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      setLoginSuccess(true);

      await refetch();

      if (isLoading) {
        toast.info("Loading wishlist data...");
        return;
      }
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

      if (storedWishlist.length > 0) {
        if (serverWishlist?.products?.length > 0) {
          dispatch(clearLocalWishlist());
          localStorage.setItem(
            "wishlist",
            JSON.stringify(serverWishlist.products)
          );
        } else {
          await syncWish(storedWishlist);
          refetch();
        }
      } else {
        localStorage.setItem(
          "wishlist",
          JSON.stringify(serverWishlist.products)
        );
      }

      // navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          margin: "2rem 0 0 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Sign In
        </Typography>
        {submitError && (
          <Message severity="error" variant="outlined">
            {submitError}
          </Message>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 1, fontSize: "14px" }}
            // disabled={isLoading}
          >
            Sign In
          </Button>
        </Box>
        <Divider
          sx={{
            height: "1px",
            marginY: 1,
            width: "100%",
          }}
        />
        <Button variant="outlined" sx={{ mt: 1, fontSize: "14px" }}>
          <FcGoogle style={{ marginRight: 8 }} />
          Continue with Google
        </Button>
        <Button variant="outlined" sx={{ mt: 1, fontSize: "14px" }}>
          <FaSquareFacebook style={{ marginRight: 8, color: "#1877F2" }} />
          Continue with Facebook
        </Button>
      </Box>
      <Grid container sx={{ marginBottom: 4, marginTop: 1 }}>
        <Grid item xs>
          <MuiLink component={RouterLink} to="/recoverpassword" variant="body2">
            Forgot password?
          </MuiLink>
        </Grid>
        <Grid item>
          <MuiLink component={RouterLink} to="/register" variant="body2">
            Don't have an account? Sign Up
          </MuiLink>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignIn;
