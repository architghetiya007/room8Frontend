import { Box, Chip, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useAdvertisementMutations from "../../../mutations/advertisement";
import { CityDTO } from "../../../types/advertisement";

const CitySection: React.FC = () => {
  const { topCitiesMutation } = useAdvertisementMutations();
  const [cities, setCities] = useState<CityDTO[]>([]);

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
        background:
          "linear-gradient(90deg, rgba(255, 233, 244, 0.3) 0%, rgba(234, 243, 255, 0.55) 100%);",
        p: {
          xs: 1,
          md: 4,
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
            justifyContent: "flex-start",
          }}
        >
          <Typography
            sx={{
              fontWeight: "700",
              color: "#6D778A",
              fontSize: "24px",
              lineHeight: "40px",
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
                    <Typography
                      sx={{
                        color: "#6D778A",
                        fontWeight: "600",
                        fontSize: "16px",
                      }}
                    >
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
