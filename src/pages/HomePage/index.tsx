import { Box } from "@mui/material";
import React from "react";
import HeroSection from "../../components/HomePage/HeroSection";
import CitySection from "../../components/HomePage/CitySection";
import RoomSection from "../../components/HomePage/RoomSection";
import RoomRentalSection from "../../components/HomePage/RoomRentalSection";

const HomePage: React.FC = () => {
  return (
    <Box>
      <HeroSection />
      <CitySection />
      <RoomSection />
      <RoomRentalSection />
    </Box>
  );
};

export default HomePage;
