import { Box, Chip, Container, Typography, useTheme } from "@mui/material";
import React from "react";

interface CityProps {
  city: string;
}

const CityData: CityProps[] = [
  {
    city: "Warsaw (1200)",
  },
  {
    city: "Gdansk (732)",
  },
  {
    city: "Wroclaw (326)",
  },
  {
    city: "Poznan (480)",
  },
  {
    city: "Krakow (213)",
  },
  {
    city: "Lubin (79)",
  },
];

const CitySection: React.FC = () => {
  const theme = useTheme();
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
            {CityData.map((item) => {
              return (
                <Chip
                  key={item.city}
                  sx={{
                    m: 1,
                    p: {
                      xs: 0,
                      md: 3,
                    },
                    borderRadius: 8,
                  }}
                  label={item.city}
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
