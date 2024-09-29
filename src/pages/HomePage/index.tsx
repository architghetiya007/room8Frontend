import { Box } from "@mui/material";
import React from "react";
import HeroSection from "../../components/HomePage/HeroSection";
import CitySection from "../../components/HomePage/CitySection";
import RoomSection from "../../components/HomePage/RoomSection";
import RoomRentalSection from "../../components/HomePage/RoomRentalSection";
import EasyStepSection from "../../components/HomePage/EasyStepSection";
import ApartmentSection from "../../components/HomePage/ApartmentSection";
import AtRoom8Section from "../../components/HomePage/AtRoom8Section";
import RoomMatesSection from "../../components/HomePage/RoomMatesSection";

const HomePage: React.FC = () => {
  return (
    <Box>
      <HeroSection />
      <ApartmentSection />
      <CitySection />
      <RoomSection />
      <RoomRentalSection />
      <EasyStepSection />
      <RoomMatesSection />
      <AtRoom8Section />
    </Box>
  );
};

export default HomePage;
