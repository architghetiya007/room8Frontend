import { Box, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import RoomImage from "../../../assets/room.png";
import { AdvertisementData } from "../../../types/advertisement";
import { AdvertisementType } from "../../../utils/advertisement";
import dayjs from "dayjs";
import BedImg from "../../../assets/roomcard/Bed.svg";
import EntireImg from "../../../assets/roomcard/Entire.svg";
import PersonImg from "../../../assets/roomcard/Person.svg";
import SharedImg from "../../../assets/roomcard/Shared.svg";
import StayImg from "../../../assets/roomcard/Stay.svg";
import HomeImg from "../../../assets/roomcard/home.svg";
import useCommonTranslation from "../../../hooks/useCommonTranslation";

interface RoomCardProps {
  advertisement: AdvertisementData;
}
const RoomCard: React.FC<RoomCardProps> = ({ advertisement }) => {
  const { t } = useCommonTranslation();
  return (
    <Stack
      flexDirection={"column"}
      sx={{
        borderRadius: 2,
        backgroundColor: "#fff", // White background to see the shadow clearly
        boxShadow: "31px 39px 88.17px 0px #5165AB1F",
        transition: "box-shadow 0.3s ease-in-out", // Smooth transition for hover effect
        "&:hover": {
          boxShadow: "31px 39px 88.17px 0px #5165AB1F",
        },
        cursor: "pointer",
      }}
    >
      {advertisement.advertiseType === AdvertisementType.HUNTER && (
        <Box sx={{ height: "220px", p: 1, position: "relative" }}>
          <Box
            component={"img"}
            width={"100%"}
            height={"220px"}
            borderRadius={3}
            src={
              advertisement.hunterData?.photos
                ? advertisement.hunterData?.photos
                : RoomImage
            }
          ></Box>
          <Chip
            label={
              advertisement?.hunterData?.isAvailableNow
                ? "Available Now"
                : advertisement?.hunterData?.whenYouWouldLikeMoveIn
                ? "Available From " +
                  dayjs(
                    advertisement.hunterData?.whenYouWouldLikeMoveIn
                  ).format("MM/DD/YYYY")
                : ""
            }
            sx={{
              background: advertisement?.hunterData?.isAvailableNow
                ? "#3EBC61"
                : "#FF445E",
              color: "white",
              position: "absolute",
              left: "20px",
              top: "20px",
              height: "25px",
              fontWeight: "600",
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
            borderRadius={3}
            src={
              advertisement.landlordData?.profilePhoto
                ? advertisement.landlordData?.profilePhoto
                : RoomImage
            }
          ></Box>
          <Chip
            label={
              advertisement?.landlordData?.isAvailableNow
                ? "Available Now"
                : advertisement?.landlordData?.dateAvailable
                ? "Available From " +
                  dayjs(advertisement.landlordData?.dateAvailable).format(
                    "MM/DD/YYYY"
                  )
                : ""
            }
            sx={{
              background: advertisement?.landlordData?.isAvailableNow
                ? "#3EBC61"
                : "#FF445E",
              color: "white",
              position: "absolute",
              left: "20px",
              top: "20px",
              height: "25px",
              fontWeight: "600",
            }}
          ></Chip>
        </Box>
      )}

      <Box sx={{ p: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{
            maxHeight:
              advertisement.advertiseType === AdvertisementType.HUNTER
                ? "30px"
                : "30px",
            minHeight:
              advertisement.advertiseType === AdvertisementType.HUNTER
                ? "30px"
                : "30px",
            overflow: "hidden",
            color: "#6D778A",
            fontWeight: "600",
            fontSize: "16px"
          }}
        >
          {advertisement.advertiseType === AdvertisementType.HUNTER
            ? advertisement.hunterData?.address?.formattedAddress
            : advertisement.landlordData?.address?.formattedAddress}
        </Typography>
        {advertisement.advertiseType === AdvertisementType.HUNTER && (
          <Typography
            sx={{ fontSize: "22px", color: "#373940" }}
            variant="h6"
            fontWeight={"700"}
          >
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
          <Typography
            sx={{ fontSize: "22px", color: "#373940" }}
            variant="h6"
            fontWeight={"600"}
          >
            {advertisement!.landlordData!.rentPerMonth} zł/month -{" "}
            {advertisement!.landlordData?.propertySize} m²
          </Typography>
        )}
        {advertisement.advertiseType === AdvertisementType.LANDLORD && (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            pt={1.5}
          >
            {advertisement.landlordData?.propertyOffer !== "ENTIREROOM" && (
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
                <Box
                  component={"img"}
                  src={
                    advertisement.landlordData?.propertyOffer === "SHAREDROOM"
                      ? SharedImg
                      : EntireImg
                  }
                ></Box>
                <Typography
                  sx={{ ml: 0.5, fontSize: "14px", color: "#6D778A", fontWeight: "450" }}
                  variant="subtitle2"
                >
                  {advertisement.landlordData?.propertyOffer}
                </Typography>
              </Box>
            )}
            <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
              <Box component={"img"} src={BedImg}></Box>
              <Typography
                sx={{ ml: 0.5, fontSize: "14px", color: "#6D778A", fontWeight: "450" }}
                variant="subtitle2"
              >
                {advertisement?.landlordData?.roomsAmount} rooms
              </Typography>
            </Box>
            {advertisement.landlordData?.propertyOffer === "ENTIREROOM" && (
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
                <Box component={"img"} src={PersonImg}></Box>
                <Typography
                  sx={{ ml: 0.5, fontSize: "14px", color: "#6D778A", fontWeight: "450" }}
                  variant="subtitle2"
                >
                  {advertisement.landlordData?.flatmateAccepting?.length}{" "}
                  flatmates
                </Typography>
              </Box>
            )}

            <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
              <Box component={"img"} src={StayImg}></Box>
              <Typography
                sx={{ ml: 0.5, fontSize: "14px", color: "#6D778A", fontWeight: "450" }}
                variant="subtitle2"
              >
                {t(`duration.${advertisement?.landlordData?.minimumStay}`)}
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
              <Box component={"img"} src={HomeImg}></Box>
              <Typography
                sx={{ ml: 1, mt: 0.5, color: "#6D778A", fontSize: "14px", fontWeight: "450" }}
                variant="subtitle2"
              >
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
