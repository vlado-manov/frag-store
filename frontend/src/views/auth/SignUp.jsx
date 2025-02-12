import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../slices/userSlice";
import { setCredentials } from "../../slices/authSlice";
import { z } from "zod";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as MuiLink } from "@mui/material";
import { toast } from "react-toastify";
import Message from "../../components/ux/Message";
import CustomButton from "../../components/ui/CustomButton";

export const baseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Za-z]/, "Password must include Latin letters")
    .regex(/\d/, "Password must include a digit")
    .regex(/[!?@#$%^&*]/, "Password must include a special character")
    .regex(
      /^[A-Za-z0-9!?@#$%^&*]+$/,
      "Password must only contain Latin letters, numbers, and special characters"
    ),
  confirmPassword: z.string().min(1, "Please confirm your password"),
});

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const [signup, { isLoading }] = useRegisterMutation();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      baseSchema.parse(formData);

      if (formData.password !== formData.confirmPassword) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Passwords don't match",
        }));
        return;
      }

      const res = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      if (err.errors) {
        const fieldErrors = {};
        err.errors.forEach((error) => {
          const path = error.path[0];
          fieldErrors[path] = error.message;
        });
        setErrors(fieldErrors);
      } else {
        toast.error(err?.data.message || err.error);
        setSubmitError(err?.data.message || err.error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    try {
      const fieldSchema = baseSchema.shape[name];
      fieldSchema.parse(value);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    } catch (err) {
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
    <div className="bg-gradient-to-r from-sky-500 to-rose-500 py-10 px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 m-auto max-w-lg">
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
            <CustomButton
              variant="primary"
              tw="block w-full uppercase font-roboto mt-2 py-3"
              disabled={isLoading}
              type="submit"
            >
              Sign up
            </CustomButton>
          </Box>
        </Box>
        <Grid container sx={{ marginTop: 1 }}>
          <Grid item xs>
            <MuiLink
              component={RouterLink}
              to="/recoverpassword"
              variant="body2"
            >
              {"Forgot password?"}
            </MuiLink>
          </Grid>
          <Grid item>
            <MuiLink component={RouterLink} to="/login" variant="body2">
              {"Already have an account? Sign In"}
            </MuiLink>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default SignUp;
