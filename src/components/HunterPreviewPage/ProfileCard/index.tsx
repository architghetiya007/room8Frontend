import { Box, Grid, Stack, Typography } from "@mui/material";
import ProfilePNG from "../../../assets/images/profile.png";

const ProfileCard: React.FC = () => {
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
          <Box sx={{
            width: {
              xs: '100%'
            }
          }} component={"img"} src={ProfilePNG}></Box>
        </Grid>
        <Grid item xs={12} md={5} ml={2}>
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
              Aleksander{" "}
            </Typography>
            <Typography variant="h6" mt={"0 !important"}>
              28 years old, Man
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
        <Grid item xs={12} md={4}></Grid>
      </Grid>
    </Box>
  );
};

export default ProfileCard;
