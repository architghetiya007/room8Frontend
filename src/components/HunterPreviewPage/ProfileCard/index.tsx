import { Box, Grid, Stack, Typography } from "@mui/material";
import ProfilePNG from "../../../assets/images/profile.png";
import { AdvertisementData } from "../../../types/advertisement";
import AvailableImg from "../../../assets/hunter/AVAILABLE.png";
import MONTHiMG from "../../../assets/hunter/6_MONTH.png";
import dayjs from "dayjs";
import useCommonTranslation from "../../../hooks/useCommonTranslation";
interface ProfileCardProps {
  previewData: AdvertisementData;
}
const ProfileCard: React.FC<ProfileCardProps> = ({ previewData }) => {
  const { t } = useCommonTranslation();

  const mainPrice = ((previewData?.hunterData?.acceptableRentRange?.at(0) ?? 0) + (previewData?.hunterData?.acceptableRentRange?.at(1) ?? 0)) /2;
  const price = ((previewData?.hunterData?.acceptableRentRange?.at(1) ?? 0) - mainPrice)
  return (
    <Box
      sx={{
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        boxShadow: 3, // Predefined MUI box shadow (3 is moderate depth)
        width: "100%",
        flexWrap: {
          xs: "wrap",
          md: "nowrap",
        },
        p: 1,
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              width: {
                xs: "100%",
              },
            }}
            component={"img"}
            src={previewData.hunterData?.photos ?? ProfilePNG}
          ></Box>
        </Grid>
        <Grid item xs={12} md={5} pl={2}>
          <Stack spacing={1}>
            <Typography
              sx={{
                fontSize: "46px",
                background:
                  "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {previewData.hunterData!.name}{" "}
            </Typography>
            <Typography variant="h6" mt={"0 !important"}>
              {previewData.hunterData!.age} years old,{" "}
              {previewData.hunterData!.whoAreYou}
            </Typography>
            <Typography
              sx={{
                fontSize: "40px",
                background:
                  "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {mainPrice}{" "}
              zł/month ±{" "}
              {price}{" "}
              zł
            </Typography>
            <Typography variant="h6" mt={"0 !important"}>
              Looking for a {previewData?.hunterData!.accommodation} in{" "}
              {previewData?.hunterData!.address?.city}
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          display={"flex"}
          alignItems={"flex-end"}
          justifyContent={"flex-start"}
          direction={"column"}
          spacing={2}
          ml={"auto"}
          gap={2}
          mt={2}
        >
          <Box
            sx={{
              borderRadius: 10,
              backgroundColor: "#EDF4FE",
              py: 1,
              px: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Typography>
              {previewData?.hunterData?.isAvailableNow
                ? "Available Immediately"
                : previewData?.hunterData?.whenYouWouldLikeMoveIn
                ? dayjs(previewData.hunterData?.whenYouWouldLikeMoveIn).format(
                    "MM/DD/YYYY"
                  )
                : ""}
            </Typography>
            <Box
              sx={{ width: "25px", height: "25px" }}
              component={"img"}
              src={AvailableImg}
            ></Box>
          </Box>
          <Box
            sx={{
              borderRadius: 10,
              backgroundColor: "#EDF4FE",
              py: 1,
              px: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Typography>
              {t(
                `duration.${
                  previewData.hunterData?.preferredLengthToStay as string
                }`
              )}{" "}
              length stay{" "}
            </Typography>
            <Box
              sx={{ width: "25px", height: "25px" }}
              component={"img"}
              src={MONTHiMG}
            ></Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileCard;
