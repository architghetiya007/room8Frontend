import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

const EasyStepSection: React.FC = () => {
  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
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
        </Grid>
      </Container>
    </Box>
  );
};

export default EasyStepSection;
