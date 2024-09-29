import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RoomMatePng from "../../../assets/images/roommate.png";
import ApartmentPng from "../../../assets/images/apartment.png";

const ApartmentSection: React.FC = () => {
  return (
    <Box>
      <Container>
        <Grid container spacing={2} mt={2} mb={10}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
                border: "2px solid #44ABEB",
                boxShadow: 3, // Predefined MUI box shadow (3 is moderate depth)
                width: "100%",
                flexWrap: {
                  xs: "wrap",
                  md: "nowrap",
                },
              }}
            >
              <Stack direction={"column"} spacing={2} p={2}>
                <Typography variant="h4">Looking For a Roomate?</Typography>
                <Typography>
                  Post your listing and find the perfect roommate for your
                  place.
                </Typography>
                <Button
                  startIcon={<AddIcon />}
                  sx={{
                    backgroundColor: "#44ABEB",
                    color: "white",
                    borderRadius: 10,
                    p: 1,
                    width: "auto",
                    height: "55px",
                  }}
                >
                  Add Room/Apartment
                </Button>
              </Stack>
              <Stack>
                <Box
                  component={"img"}
                  sx={{
                    maxWidth: {
                      xs: "100%",
                      md: "320px",
                    },
                  }}
                  src={RoomMatePng}
                ></Box>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
                border: "2px solid #E152B9",
                boxShadow: 3, // Predefined MUI box shadow (3 is moderate depth)
                width: "100%",
                flexWrap: {
                  xs: "wrap",
                  md: "nowrap",
                },
              }}
            >
              <Stack direction={"column"} spacing={2} p={2}>
                <Typography variant="h4">
                  Looking for a room or apartment?
                </Typography>
                <Typography>
                  Fill out a quick form, meet potential roommates, and find your
                  ideal place.
                </Typography>
                <Button
                  startIcon={<AddIcon />}
                  sx={{
                    backgroundColor: "#E152B9",
                    color: "white",
                    borderRadius: 10,
                    p: 1,
                    width: "auto",
                    height: "50px",
                  }}
                >
                  Add an Announcement
                </Button>
              </Stack>
              <Stack>
                <Box
                  component={"img"}
                  sx={{
                    maxWidth: {
                      xs: "100%",
                      md: "266px",
                    },
                  }}
                  src={ApartmentPng}
                ></Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ApartmentSection;
