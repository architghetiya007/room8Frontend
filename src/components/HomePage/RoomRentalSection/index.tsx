import { Box, Container, Typography } from "@mui/material";
import React from "react";
import RoomBackImage from "../../../assets/RoomBack.png";
const RoomRentalSection: React.FC = () => {
  return (
    <Box
      sx={{
        px: 4,
        py: 10,
      }}
    >
      <Container>
        <Box
          sx={{
            backgroundColor: "white",
            backgroundImage: `url(${RoomBackImage})`, // URL to your image
            width: "100%",
            height: "230px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.1)", // White shadow
            transition: "box-shadow 0.3s ease-in-out",
            borderRadius: "20px",
          }}
        >
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
            Room8 is more than just a rental app
          </Typography>
          <Typography
            sx={{
              mt: 2,
              fontSize: "24px",
            }}
            variant="subtitle1"
          >
            It's a chance to get to know your potential roommate thoroughly
            before deciding to move in together.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
export default RoomRentalSection;
