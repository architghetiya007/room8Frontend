import { Box, Container, Typography } from "@mui/material";
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <Box>
      <Container>
        <Typography
          sx={{
            fontSize: "50px",
            background:
              "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
          }}
        >
          Get to Know Your Roommate <br /> Before You Move In
        </Typography>
      </Container>
    </Box>
  );
};
export default HeroSection;
