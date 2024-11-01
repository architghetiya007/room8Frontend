import { Box, Grid, Typography } from "@mui/material";
import { AdvertisementData } from "../../types/advertisement";
import ROOMSIZE from "../../assets/landlord/roomsize.png";
import PROPERTY from "../../assets/landlord/property.png";
import ROOMS from "../../assets/landlord/rooms.png";
import flatmates from "../../assets/landlord/flatmates.png";
interface LandlordPreviewDescriptionProps {
  previewData: AdvertisementData;
}
const LandloardPreviewSubCard: React.FC<LandlordPreviewDescriptionProps> = ({
  previewData,
}) => {
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
        p: 3,
      }}
    >
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                component={"img"}
                sx={{ width: "25px", height: "25px" }}
                src={ROOMSIZE}
              ></Box>
              <Typography
                sx={{
                  border: "1px solid #FBE0EA",
                  borderRadius: 2,
                  p: 1,
                  color: "#3B3D44",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                room: {previewData.landlordData?.roomSize} (m²)
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                component={"img"}
                sx={{ width: "25px", height: "25px" }}
                src={PROPERTY}
              ></Box>
              <Typography
                sx={{
                  border: "1px solid #FBE0EA",
                  borderRadius: 2,
                  p: 1,
                  color: "#3B3D44",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                property: {previewData.landlordData?.propertySize} (m²)
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                component={"img"}
                sx={{ width: "25px", height: "25px" }}
                src={ROOMS}
              ></Box>
              <Typography
                sx={{
                  border: "1px solid #FBE0EA",
                  borderRadius: 2,
                  p: 1,
                  color: "#3B3D44",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                {previewData.landlordData?.roomsAmount} rooms
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                component={"img"}
                sx={{ width: "25px", height: "25px" }}
                src={flatmates}
              ></Box>
              <Typography
                sx={{
                  border: "1px solid #FBE0EA",
                  borderRadius: 2,
                  p: 1,
                  color: "#3B3D44",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                {previewData?.landlordData?.howmanyPeopleLive} flatmates
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandloardPreviewSubCard;
