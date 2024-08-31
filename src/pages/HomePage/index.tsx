import { Box } from "@mui/material";
import React from "react";
import HeroSection from "../../components/HomePage/HeroSection";
import CitySection from "../../components/HomePage/CitySection";

const HomePage: React.FC = () => {
  return (
    <Box>
      <HeroSection />
      <CitySection />
    </Box>
  );
};

export default HomePage;
