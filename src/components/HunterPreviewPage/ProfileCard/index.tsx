import { Box, Grid, Stack, Typography } from "@mui/material";
import ProfilePNG from "../../../assets/images/profile.png";
import { AdvertisementData } from "../../../types/advertisement";
import AvailableImg from "../../../assets/hunter/AVAILABLE.png";
import MONTHiMG from "../../../assets/hunter/6_MONTH.png";
interface ProfileCardProps {
  previewData: AdvertisementData;
}
const ProfileCard: React.FC<ProfileCardProps> = ({ previewData }) => {
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
                fontSize: "46px",
                background:
                  "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              1300 zł/month ± 200 zł
            </Typography>
            <Typography variant="h6" mt={"0 !important"}>
              Looking for a shared room in Wrocław
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
        >
          <Box
            sx={{
              maxWidth: "250px",
              borderRadius: 10,
              backgroundColor: "#EDF4FE",
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Typography>Available Immediately</Typography>
            <Box component={"img"} src={AvailableImg}></Box>
          </Box>
          <Box
            sx={{
              maxWidth: "250px",
              borderRadius: 10,
              backgroundColor: "#EDF4FE",
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Typography>6 months length stay </Typography>
            <Box component={"img"} src={MONTHiMG}></Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileCard;
