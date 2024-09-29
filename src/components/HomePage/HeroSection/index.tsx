import {
  Box,
  Container,
  Grid,
  OutlinedInput,
  Typography,
  InputAdornment,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined"; // Outlined map pin icon

const HeroSection: React.FC = () => {
  return (
    <Box>
      <Container>
        <Grid container spacing={2} mb={4}>
          <Grid item xs={12}>
            <Typography
              sx={{
                fontSize: "50px",
                background:
                  "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: "center",
              }}
            >
              Get to Know Your Roommate <br /> Before You Move In
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ textAlign: "center" }} variant="subtitle1">
              Lorem ipsum dolor sit amet laoreet quis imperdiet quis, consequat
              id lorem.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              ml: "auto",
              mr: "auto",
            }}
          >
            <OutlinedInput
              fullWidth
              placeholder="Search for a town, locality or street"
              startAdornment={
                <InputAdornment position="start">
                  <RoomOutlinedIcon />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    startIcon={<SearchIcon />}
                    sx={{
                      borderRadius: "20px",
                      backgroundColor: "black", // Black background color
                      color: "white", // White text color
                      textTransform: "none", // Prevent text from being uppercase
                      "&:hover": {
                        backgroundColor: "#333", // Darker shade on hover
                      },
                      height: "42px",
                    }}
                  >
                    Search
                  </Button>
                </InputAdornment>
              }
              sx={{
                borderRadius: 10, // Add border-radius to the input field
                paddingRight: "8px", // Adjust padding for better appearance
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default HeroSection;
