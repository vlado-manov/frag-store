import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CustomButton from "../../components/ui/CustomButton";

function RecoverPassword() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-gradient-to-r from-sky-500 to-rose-500 py-10 px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 m-auto max-w-md">
        <Box
          sx={{
            margin: "2rem 0 0 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: 3 }}>
            Recover your password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New password"
              type="password"
              id="newPassword"
              // autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm password"
              type="password"
              id="confirmPassword"
              // autoComplete="current-password"
            />
            <CustomButton
              variant="primary"
              tw="block w-full uppercase font-roboto my-2 py-3"
              type="submit"
            >
              Change password
            </CustomButton>

            <Box>
              <MuiLink component={RouterLink} to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </MuiLink>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default RecoverPassword;
