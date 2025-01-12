import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { CompanyMenus, ServicesMenu } from "../../../utils/Footer";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #141A1D, #351440, #392927)",
        px: 2,
        py: 8,
      }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Typography
              sx={{
                background:
                  "linear-gradient(#4AB1F1 -1.63%, #566CEC 36.36%, #D749AF 74.36%, #FF7C51 114.16%);",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              mb={1}
              variant="h5"
              color={"white"}
              fontWeight={"bold"}
            >
              Room8
            </Typography>
            <Typography sx={{ color: "#C4C9D1", fontSize: "14px" }}>
              Room8 is a place for people looking for roommates or a place to
              live - rooms, apartments or houses for rent. Just create an offer
              and search or be found by others!
            </Typography>
          </Grid>
          <Grid item xs={6} md={3} textAlign={"center"}>
            <Typography
              mb={1}
              variant="h6"
              color={"white"}
              sx={{ fontSize: "20px" }}
            >
              Company
            </Typography>
            <Stack flexDirection={"column"} spacing={1}>
              {CompanyMenus.map((item) => {
                return (
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "#EBF1FF",
                      fontSize: "16px",
                      fontWeight: "500",
                      lineHeight: "23px"
                    }}
                    key={item.name}
                  >
                    {item.name}
                  </Typography>
                );
              })}
            </Stack>
          </Grid>
          <Grid item xs={6} md={3} textAlign={"center"}>
            <Typography
              mb={1}
              variant="h6"
              color={"white"}
              sx={{ fontSize: "20px" }}
            >
              Services
            </Typography>
            <Stack flexDirection={"column"} spacing={1}>
              {ServicesMenu.map((item) => {
                return (
                  <Typography
                    variant="subtitle1"
                    key={item.name}
                    sx={{
                      color: "#EBF1FF",
                      fontSize: "16px",
                      fontWeight: "500",
                      lineHeight: "23px"
                    }}
                  >
                    {item.name}
                  </Typography>
                );
              })}
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography
              mb={1}
              variant="h6"
              color={"white"}
              sx={{ fontSize: "20px" }}
            >
              Let's Connect
            </Typography>
          </Grid>
          <Grid item xs={12} mt={1} mb={1}>
            <Box sx={{ borderBottom: "1px solid lightgray" }}></Box>
          </Grid>
          <Grid item xs={12}>
            <Stack
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ color: "#EBF1FF", fontWeight: "400", fontSize: "16px" }}
              >
                {" "}
                Copyright © Room8 - All Right Reserved
              </Typography>
              <Typography
                sx={{ color: "#EBF1FF", fontWeight: "400", fontSize: "16px" }}
                variant="subtitle1"
              >
                Privacy Policy | Cookie Policy | Refund Policy
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
