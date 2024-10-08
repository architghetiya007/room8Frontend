import { Box, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import RoomImage from "../../../assets/room.png";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import { AdvertisementData } from "../../../types/advertisement";
import { AdvertisementType } from "../../../utils/advertisement";
import dayjs from "dayjs";
import AddHomeOutlined from "@mui/icons-material/AddHomeOutlined";
interface RoomCardProps {
  advertisement: AdvertisementData;
}
const RoomCard: React.FC<RoomCardProps> = ({ advertisement }) => {
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
      {advertisement.advertiseType === AdvertisementType.HUNTER && (
        <Box sx={{ height: "220px", p: 1, position: "relative" }}>
          <Box
            component={"img"}
            width={"100%"}
            height={"220px"}
            src={advertisement.hunterData?.photos ?? RoomImage}
          ></Box>
          <Chip
            label={
              advertisement?.hunterData?.isAvailableNow
                ? "Available Now"
                : advertisement?.hunterData?.whenYouWouldLikeMoveIn
                ? "Available From" +
                  dayjs(
                    advertisement.hunterData?.whenYouWouldLikeMoveIn
                  ).format("MM/DD/YYYY")
                : ""
            }
            sx={{
              background: advertisement?.hunterData?.isAvailableNow
                ? "green"
                : "red",
              color: "white",
              position: "absolute",
              left: "20px",
              top: "20px",
            }}
          ></Chip>
        </Box>
      )}

      {advertisement.advertiseType === AdvertisementType.LANDLORD && (
        <Box sx={{ height: "220px", p: 1, position: "relative" }}>
          <Box
            component={"img"}
            width={"100%"}
            height={"220px"}
            src={advertisement.landlordData?.profilePhoto ?? RoomImage}
          ></Box>
          <Chip
            label={
              advertisement?.landlordData?.isAvailableNow
                ? "Available Now"
                : advertisement?.landlordData?.dateAvailable
                ? "Available From" +
                  dayjs(advertisement.landlordData?.dateAvailable).format(
                    "MM/DD/YYYY"
                  )
                : ""
            }
            sx={{
              background: advertisement?.landlordData?.isAvailableNow
                ? "green"
                : "red",
              color: "white",
              position: "absolute",
              left: "20px",
              top: "20px",
            }}
          ></Chip>
        </Box>
      )}

      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1">
          {advertisement.advertiseType === AdvertisementType.HUNTER
            ? advertisement.hunterData?.address?.formattedAddress
            : advertisement.landlordData?.address?.formattedAddress}
        </Typography>
        {advertisement.advertiseType === AdvertisementType.HUNTER && (
          <Typography variant="h6" fontWeight={"600"}>
            {advertisement!.hunterData!.acceptableRentRange!.length > 0
              ? advertisement?.hunterData?.acceptableRentRange?.at(0)
              : ""}{" "}
            zł/month ±{" "}
            {advertisement!.hunterData!.acceptableRentRange!.length > 0
              ? advertisement?.hunterData?.acceptableRentRange?.at(1)
              : ""}{" "}
            zł
          </Typography>
        )}
        {advertisement.advertiseType === AdvertisementType.LANDLORD && (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            pt={1}
          >
            <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
              <BathtubOutlinedIcon />
              <Typography sx={{ ml: 1 }} variant="subtitle1">
                {advertisement.landlordData?.privateBathroom} baths
              </Typography>
            </Box>
            <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
              <BedOutlinedIcon />
              <Typography sx={{ ml: 1 }} variant="subtitle1">
                {advertisement?.landlordData?.bed} bedrooms
              </Typography>
            </Box>
            <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
              <Person2OutlinedIcon />
              <Typography sx={{ ml: 1 }} variant="subtitle1">
                2 sharing
              </Typography>
            </Box>
          </Box>
        )}
        {advertisement.advertiseType === AdvertisementType.HUNTER && (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            pt={1}
          >
            <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
              <AddHomeOutlined />
              <Typography sx={{ ml: 1 }} variant="subtitle1">
                Looking for a room/shared room
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Stack>
  );
};
export default RoomCard;
