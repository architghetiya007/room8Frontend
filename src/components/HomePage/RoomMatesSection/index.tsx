import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import RoomMate from "../../../assets/images/perfectroommates.png";
import { LoadingButton } from "@mui/lab";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const RoomMatesSection: React.FC = () => {
  return (
    <Box sx={{ background: "linear-gradient(to right, #FFE9F4, #EAF3FF)" }}>
      <Container>
        <Grid container spacing={2} mt={4}>
          <Grid item xs={12} md={8}>
            <Stack spacing={3} pt={4}>
              <Typography
                sx={{
                  fontSize: "36px",
                  background:
                    "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginRight: 2, // Space between the text
                }}
              >
                Join Room8 and find the perfect roommates
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "20px" }}>
                and a stress-free apartment! Create profiles, browse offers and
                meet new people in a friendly way.{" "}
                <b>Start your adventure today!</b>
              </Typography>
              <LoadingButton
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
                  maxWidth: "300px",
                }}
                type="button"
                endIcon={
                  <ArrowForwardIcon sx={{ fontSize: "30px !important" }} />
                }
              >
                Get Started
              </LoadingButton>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack>
              <Box
                component={"img"}
                sx={{
                  maxWidth: {
                    xs: "100%",
                    md: "266px",
                  },
                  ml: "auto",
                  mr: "auto",
                }}
                src={RoomMate}
              ></Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default RoomMatesSection;
