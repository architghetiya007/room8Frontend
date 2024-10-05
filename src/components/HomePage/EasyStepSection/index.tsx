import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import Step1 from "../../../assets/images/Step1.png";
import Step2 from "../../../assets/images/Step2.png";
import Step3 from "../../../assets/images/Step3.png";
const EasyStepSection: React.FC = () => {
  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row", // Arrange items in a row
                alignItems: "center", // Align items vertically in the center
                justifyContent: "center", // Center items horizontally
                textAlign: "center", // Center text
                flexWrap: "wrap", // Wrap items if necessary
                maxWidth: "900px",
                ml: "auto",
                mr: "auto",
              }}
            >
              <Typography sx={{ marginRight: 2, fontSize: "40px" }}>
                Find the
              </Typography>
              <Typography
                sx={{
                  fontSize: "40px",
                  background:
                    "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginRight: 2, // Space between the text
                }}
              >
                Perfect Roommate
              </Typography>
              <Typography sx={{ marginRight: 2, fontSize: "40px" }}>
                Room or Apartment in
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
                3 Easy Steps
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} display={'flex'} gap={2} flexDirection={'column'}>
            <Typography
              sx={{
                fontSize: "24px",
                background:
                  "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: "start",
              }}
            >
              STEP 1
            </Typography>
            <Typography variant="h4">
              Create a Profile and specify your preferences
            </Typography>
            <Typography>
              Create your Room8 account and immerse yourself in the ocean of
              possibilities by adding your preferences regarding accommodation
              and flatmate.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
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
                src={Step1}
              ></Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
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
                src={Step2}
              ></Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} display={'flex'} gap={2} flexDirection={'column'}>
            <Typography
              sx={{
                fontSize: "24px",
                background:
                  "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: "start",
              }}
            >
              STEP 2
            </Typography>
            <Typography variant="h4">
              Discover Matches - Don't waste time searching
            </Typography>
            <Typography>
              Find or be found. Thanks to the intelligent matching system, we
              will quickly match you with a place or roommate that perfectly
              suits your preferences.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} display={'flex'} gap={2} flexDirection={'column'}>
            <Typography
              sx={{
                fontSize: "24px",
                background:
                  "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: "start",
              }}
            >
              STEP 3
            </Typography>
            <Typography variant="h4">
              Contact and Build a Harmonious Community
            </Typography>
            <Typography>
              Communicate with the person or property of your choice to arrange
              details and support a harmonious living experience for both
              parties.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
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
                src={Step3}
              ></Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default EasyStepSection;
