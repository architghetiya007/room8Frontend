import { Box, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import RoomCard from "../../Room/RoomCard";
import { AdvertisementData } from "../../../types/advertisement";
import useAdvertisementMutations from "../../../mutations/advertisement";

const RoomSection: React.FC = () => {
  const { getAllAdvertisementMutation } = useAdvertisementMutations();
  const [roomData, setRoomData] = useState<AdvertisementData[]>([]);

  const getAllAdvertisementAPI = () => {
    getAllAdvertisementMutation.mutate(undefined, {
      onSuccess: (data) => {
        setRoomData(data!.data);
      },
    });
  };

  console.log(roomData, "roomData");

  useEffect(() => {
    getAllAdvertisementAPI();
  }, []);

  return (
    <Box
      sx={{
        px: {
          xs: 1,
          md: 4,
        },
        py: {
          xs: 1,
          md: 10,
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
