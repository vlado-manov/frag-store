import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Divider, Link as MuiLink } from "@mui/material";
import { FaSquareFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../slices/userSlice";
import { useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import Message from "../../components/ui/Message";

function SignIn() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [submitError, setSubmitError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const redirect = "/";
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

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
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data.message || err.error);
      setSubmitError(err?.data.message || err.error);
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
            disabled={isLoading}
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
        <Button
          variant="outlined"
          sx={{ mt: 1, position: "relative", fontSize: "14px" }}
        >
          <FcGoogle
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
            }}
          />
          Continue with Google
        </Button>
        <Button variant="outlined" sx={{ marginTop: 1, fontSize: "14px" }}>
          <FaSquareFacebook
            color="#1877F2"
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
            }}
          />
          Continue with Facebook
        </Button>
      </Box>
      <Grid container sx={{ marginBottom: 4, marginTop: 1 }}>
        <Grid item xs>
          <MuiLink component={RouterLink} to="/recoverpassword" variant="body2">
            {"Forgot password?"}
          </MuiLink>
        </Grid>
        <Grid item>
          <MuiLink component={RouterLink} to="/register" variant="body2">
            {"Don't have an account? Sign Up"}
          </MuiLink>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignIn;
