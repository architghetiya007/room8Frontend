import { Box } from "@mui/material";
import React from "react";
import Header from "../../comman/Header";
import Footer from "../../comman/Footer";
// import BackImage from "../../../assets/images/background.svg";
import { useLocation } from "react-router-dom";
interface GuestLayoutProps {
  children: React.ReactNode;
}
const GuestLayout: React.FC<GuestLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <Box>
      <Box
        sx={{
          content: '""',
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)", // Center it horizontally
          width: "100%", // Central area width
          height: "600px", // Full height of the container
          // backgroundImage: `url(${BackImage})`, // Use the imported image
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
          opacity: "1",
        }}
      />
      <Header />
      <Box sx={{ pt: 16 }}>
        {children}
        {!pathname.includes("messages") && <Footer />}
      </Box>
    </Box>
  );
};

export default GuestLayout;
