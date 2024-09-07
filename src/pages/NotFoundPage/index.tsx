import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background:
          "linear-gradient(to right, #4AB1F1, #566CEC, #D749AF, #FF7C51)",
        color: "#fff",
        padding: 2,
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: { xs: "80px", md: "120px" }, fontWeight: "bold" }}
      >
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 5 }}>
        The page you are looking for does not exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")} // Adjust the URL to your homepage or preferred route
        sx={{
          background: "white",
          color: "#4AB1F1",
          padding: "10px 20px",
          fontWeight: "bold",
          borderRadius: "25px",
          textTransform: "none",
          "&:hover": {
            background: "#f1f1f1",
            color: "#3f3f3f",
          },
        }}
      >
        Go Back Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
