import { Box, Chip, Container, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import useAdvertisementMutations from "../../../mutations/advertisement";
import { CityDTO } from "../../../types/advertisement";

const CitySection: React.FC = () => {
  const { topCitiesMutation } = useAdvertisementMutations();
  const [cities, setCities] = useState<CityDTO[]>([]);
  const theme = useTheme();

  const fetchCities = () => {
    topCitiesMutation.mutate(undefined, {
      onSuccess: (data) => {
        setCities(data?.data ?? []);
      },
    });
  };

  useEffect(() => {
    fetchCities();
  }, []);
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #FFEBE8, #EDD6F5, #EDF6FD)",
        p: {
          xs: 1,
          md: 5,
        },
      }}
    >
      <Container
        sx={{
          p: {
            xs: 1,
            md: 2,
          },
        }}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          sx={{
            flexDirection: {
              xs: "column",
              md: "row",
            },
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              color: theme.palette.custom.blackDarkGray,
              fontWeight: "bold",
            }}
          >
            TOP CITIES
          </Typography>
          <Box
            sx={{
              ml: {
                xs: 0,
                md: 5,
              },
            }}
          >
            {cities.map((item) => {
              return (
                <Chip
                  key={item._id}
                  sx={{
                    m: 1,
                    px: {
                      xs: 0,
                      md: 2,
                    },
                    py: {
                      xs: 0,
                      md: 3,
                    },
                    borderRadius: 8,
                    backgroundColor: "#E8EDF5",
                  }}
                  label={
                    <Typography sx={{ color: "#6D778A" }}>
                      {item._id} ({item.totalCityCount})
                    </Typography>
                  }
                ></Chip>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CitySection;
