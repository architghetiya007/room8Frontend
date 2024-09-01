import { Box } from "@mui/material";
import React from "react";
import HeroSection from "../../components/HomePage/HeroSection";
import CitySection from "../../components/HomePage/CitySection";
import RoomSection from "../../components/HomePage/RoomSection";
import RoomRentalSection from "../../components/HomePage/RoomRentalSection";
import EasyStepSection from "../../components/HomePage/EasyStepSection";

const HomePage: React.FC = () => {
  return (
    <Box>
      <HeroSection />
      <CitySection />
      <RoomSection />
      <RoomRentalSection />
      <EasyStepSection />
    </Box>
  );
};

export default HomePage;
