import { Box, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import RoomImage from "../../../assets/room.png";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
const RoomCard: React.FC = () => {
  return (
    <Stack
      flexDirection={"column"}
      sx={{
        borderRadius: 2,
        backgroundColor: "#fff", // White background to see the shadow clearly
        boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.1)", // White shadow
        transition: "box-shadow 0.3s ease-in-out", // Smooth transition for hover effect
        "&:hover": {
          boxShadow: "0px 8px 16px rgba(255, 20, 147, 0.2)", // Pink shadow on hover
        },
      }}
    >
      <Box sx={{ height: "220px", p: 1, position: "relative" }}>
        <Box
          component={"img"}
          width={"100%"}
          height={"220px"}
          src={RoomImage}
        ></Box>
        <Chip
          label="Available Now"
          sx={{
            background: "green",
            color: "white",
            position: "absolute",
            left: "20px",
            top: "20px",
          }}
        ></Chip>
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1">Lostowice, Wroclaw</Typography>
        <Typography variant="h6" fontWeight={"600"}>
          PLN 1000/month - 50m²
        </Typography>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          pt={1}
        >
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <BathtubOutlinedIcon />
            <Typography sx={{ ml: 1 }} variant="subtitle1">
              3 baths
            </Typography>
          </Box>
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <BedOutlinedIcon />
            <Typography sx={{ ml: 1 }} variant="subtitle1">
              2 bedrooms
            </Typography>
          </Box>
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <Person2OutlinedIcon />
            <Typography sx={{ ml: 1 }} variant="subtitle1">
              2 sharing
            </Typography>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};
export default RoomCard;
