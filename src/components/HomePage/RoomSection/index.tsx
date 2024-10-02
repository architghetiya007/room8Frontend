import { Box, Container, Grid } from "@mui/material";
import React from "react";
import RoomCard from "../../Room/RoomCard";

const RoomSection: React.FC = () => {
  return (
    <Box
      sx={{
        px: {
          xs: 1,
          md: 4
        },
        py: {
          xs: 1,
          md: 10
        },
      }}
    >
      <Container>
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
            return (
              <Grid key={item} item xs={12} sm={6} md={6} lg={4}>
                <RoomCard />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default RoomSection;
