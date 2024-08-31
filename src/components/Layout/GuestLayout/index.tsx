import { Box } from "@mui/material";
import React from "react";
import Header from "../../comman/Header";
import Footer from "../../comman/Footer";
interface GuestLayoutProps {
  children: React.ReactNode;
}
const GuestLayout: React.FC<GuestLayoutProps> = ({ children }) => {
  return (
    <Box>
      <Header />
      <Box sx={{ pt: 16 }}>
        {children}
        <Footer />
      </Box>
    </Box>
  );
};

export default GuestLayout;
