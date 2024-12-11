import React from "react";
import { Box, Typography, Grid, Link, useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa6";

const theme = createTheme();

const Footer = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          background: "linear-gradient(10deg, #2d1e2d 0%, #171717 100%)",
          color: "#fff",
          padding: isMobile ? "16px 32px" : "32px",
          marginTop: "auto",
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                textAlign: { xs: "center", sm: "left" },
                marginBottom: isMobile ? 2 : 0,
              }}
            >
              FragStore
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                justifyContent: { xs: "center", sm: "flex-end" },
                alignItems: "center",
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Payment Methods:
              </Typography>
              <FaCcVisa style={{ fontSize: "2rem", color: "#fff" }} />
              <FaCcMastercard style={{ fontSize: "2rem", color: "#fff" }} />
              <FaCcPaypal style={{ fontSize: "2rem", color: "#fff" }} />
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={6} sm={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              About Us
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                fontSize: "14px",
              }}
            >
              <Link href="#" color="inherit" underline="hover">
                About Us
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Terms and Conditions
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Privacy Policy
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Sitemap
              </Link>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Contacts & Help
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                fontSize: "14px",
              }}
            >
              <Link href="#" color="inherit" underline="hover">
                FAQ
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Contacts
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Delivery
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Payment
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 3, borderTop: "1px solid rgba(255,255,255,0.3)", pt: 2 }}
        >
          <Grid item xs={12} sm={6}>
            <Typography
              variant="caption"
              sx={{ textAlign: { xs: "center", sm: "left" }, display: "block" }}
            >
              © FragStore, 2024
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="caption"
              sx={{
                textAlign: { xs: "center", sm: "right" },
                display: "block",
              }}
            >
              Created by Vladimir Manov
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;
