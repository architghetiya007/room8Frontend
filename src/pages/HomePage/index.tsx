import { Box } from "@mui/material";
import React from "react";
import HeroSection from "../../components/HomePage/HeroSection";
import CitySection from "../../components/HomePage/CitySection";
import RoomSection from "../../components/HomePage/RoomSection";
import RoomRentalSection from "../../components/HomePage/RoomRentalSection";
import EasyStepSection from "../../components/HomePage/EasyStepSection";
import ApartmentSection from "../../components/HomePage/ApartmentSection";
import AtRoom8Section from "../../components/HomePage/AtRoom8Section";

const HomePage: React.FC = () => {
  return (
    <Box>
      <HeroSection />
      <ApartmentSection />
      <CitySection />
      <RoomSection />
      <RoomRentalSection />
      <EasyStepSection />
      <AtRoom8Section />
    </Box>
  );
};

export default HomePage;
