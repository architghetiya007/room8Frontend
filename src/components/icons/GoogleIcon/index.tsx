import { Box } from "@mui/material";
import React from "react";

const GoogleIcon: React.FC = () => {
  return (
    <Box
      sx={{
        width: "40px", // Adjust size as needed
        height: "25px",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="100%"
        height="100%"
      >
        <path
          fill="#4285F4"
          d="M44.5 20H24v8.5h11.8C33.1 33.8 28.1 36 24 36c-7.5 0-14-6.5-14-14s6.5-14 14-14c3.5 0 6.7 1.3 9.2 3.5l6.1-6.1C35.8 2.3 30.2 0 24 0 10.7 0 0 10.7 0 24s10.7 24 24 24c12.9 0 23.4-9.6 23.4-24 0-1.6-.2-3.2-.4-4.5z"
        />
        <path
          fill="#34A853"
          d="M0 24c0 6.6 2.6 12.6 6.8 17.2l8.2-6.7C11 32.6 9.6 28.4 9.6 24c0-4.4 1.5-8.6 4.1-11.8L6.8 6.8C2.6 11.4 0 17.4 0 24z"
        />
        <path
          fill="#FBBC05"
          d="M24 9.6c3.6 0 6.8 1.3 9.2 3.5l6.1-6.1C35.8 2.3 30.2 0 24 0v9.6z"
        />
        <path
          fill="#EA4335"
          d="M24 48c6.5 0 11.9-2.2 15.9-5.9l-7.5-6.2c-2.2 1.5-5 2.4-8.4 2.4-5.9 0-10.8-4.1-12.5-9.6L6.8 41.2C11 45.4 17 48 24 48z"
        />
      </svg>
    </Box>
  );
};

export default GoogleIcon;
