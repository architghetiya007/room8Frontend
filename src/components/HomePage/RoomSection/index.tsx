import { Box, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import RoomCard from "../../Room/RoomCard";
import { AdvertisementData } from "../../../types/advertisement";
import useAdvertisementMutations from "../../../mutations/advertisement";
import { useNavigate } from "react-router-dom";
import { AdvertisementType } from "../../../utils/advertisement";

const RoomSection: React.FC = () => {
  const navigate = useNavigate();
  const { getAllAdvertisementMutation } = useAdvertisementMutations();
  const [roomData, setRoomData] = useState<AdvertisementData[]>([]);

  const getAllAdvertisementAPI = () => {
    getAllAdvertisementMutation.mutate(undefined, {
      onSuccess: (data) => {
        setRoomData(data!.data);
      },
    });
  };

  useEffect(() => {
    getAllAdvertisementAPI();
  }, []);

  if (roomData.length == 0) {
    return null;
  }

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
          {roomData.map((item) => {
            return (
              <Grid
                onClick={() =>
                  item.advertiseType === AdvertisementType.HUNTER
                    ? navigate(`/hunter-preview/${item._id}`)
                    : navigate(`/landlord-preview/${item._id}`)
                }
                key={item._id}
                item
                xs={12}
                sm={6}
                md={6}
                lg={4}
              >
                <RoomCard advertisement={item} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default RoomSection;
