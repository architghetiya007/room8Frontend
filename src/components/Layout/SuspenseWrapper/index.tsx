import React, { Suspense } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

interface SuspenseWrapperProps {
  children: React.ReactNode;
}
const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({ children }) => {
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: "linear-gradient(to right, #6CC0F4, #8160D7, #F6A2A9)",
            color: "white",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CircularProgress
              sx={{
                color: "transparent",
                border: "4px solid transparent",
                borderTop: "4px solid white",
                borderRadius: "50%",
                width: 50,
                height: 50,
                animation: "spin 1s linear infinite",
              }}
            />
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
              Loading...
            </Typography>
          </Box>
          <style>
            {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
          </style>
        </Box>
      }
    >
      {children}
    </Suspense>
  );
};

export default SuspenseWrapper;
