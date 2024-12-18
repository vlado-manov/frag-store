import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../slices/userSlice";
import { setCredentials } from "../../slices/authSlice";
import { RootState } from "../../store";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Divider, Link as MuiLink } from "@mui/material";
import { FaSquareFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { z } from "zod";
import Message from "../../components/ui/Message";
import { baseSchema } from "../../types/formValidation";
import { ErrorResponse } from "../../types/errorTypes";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignUp() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const [signup, { isLoading }] = useRegisterMutation();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords don't match",
      }));
      return;
    } else {
      try {
        const res = await signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err: unknown) {
        const errorMessage =
          (err as ErrorResponse).data?.message ||
          "An unexpected error occurred";
        toast.error(errorMessage);
        setSubmitError(errorMessage);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    try {
      const fieldSchema =
        baseSchema.shape[name as keyof typeof baseSchema.shape];
      fieldSchema.parse(value);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    } catch (err: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: err.errors[0]?.message,
      }));
    }

    if (name === "confirmPassword") {
      if (value !== formData.password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Passwords don't match",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "",
        }));
      }
    }
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
          Sign Up
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
            id="name"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            autoFocus
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            error={!!errors.email}
            helperText={errors.email}
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
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm password"
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 1 }}
            disabled={isLoading}
          >
            Sign Up
          </Button>
        </Box>

        <Divider
          sx={{
            height: "1px",
            marginY: 1,
            width: "100%",
          }}
        />
        <Button variant="outlined" sx={{ marginTop: 1, position: "relative" }}>
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
        <Button variant="outlined" sx={{ marginTop: 1 }}>
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
          <MuiLink component={RouterLink} to="/login" variant="body2">
            {"Already have an account? Sign In"}
          </MuiLink>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignUp;
