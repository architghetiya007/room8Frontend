import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import RoomMate from "../../../assets/images/perfectroommates.png";
import { LoadingButton } from "@mui/lab";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const RoomMatesSection: React.FC = () => {
  return (
    <Box sx={{ background: "linear-gradient( rgba(255, 233, 244, 0.3) 0%, rgba(234, 243, 255, 0.55) 100%);" }}>
      <Container sx={{
        px: {
          xs: 1,
          md: "0 !important"
        }
      }}>
        <Grid container spacing={1} mt={4}>
          <Grid item xs={12} md={8}>
            <Stack spacing={3} pt={4} pb={8}>
              <Typography
                sx={{
                  fontSize: "36px",
                  background:
                    "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginRight: 0, // Space between the text
                  fontWeight: 'bold'
                }}
                variant="h2"
              >
                Join Room8 and find the perfect roommates
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "20px",color: "#6D778A" }}>
                and a stress-free apartment! Create profiles, browse offers and
                meet new people in a friendly way.{" "}
                <b>Start your adventure today!</b>
              </Typography>
              <LoadingButton
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                sx={{
                  background:
                    "linear-gradient(to right, #4AB1F1, #566CEC, #D749AF, #FF7C51)",
                  p: 1,
                  borderRadius: 8,
                  color: "white",
                  textTransform: "none",
                  letterSpacing: "1px",
                  fontWeight: "600",
                  fontSize: "24px",
                  maxWidth: "240px",
                }}
                type="button"
                endIcon={
                  <ArrowForwardIcon sx={{ fontSize: "30px !important" }} />
                }
              >
                Get Started!
              </LoadingButton>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
              <Box
                component={"img"}
                sx={{
                  width :"100%",
                  height: "320px"
                  // maxWidth: {
                  //   xs: "100%",
                  //   md: "320px",
                  // },
                  // ml: "auto",
                  // mr: "auto",
                  // mt: {
                  //   xs: 5,
                  //   md: 0
                  // }
                }}
                src={RoomMate}
              ></Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default RoomMatesSection;
