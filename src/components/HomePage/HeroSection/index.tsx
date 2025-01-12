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
import { useNavigate } from "react-router-dom";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Container>
        <Grid container spacing={2} mb={4}>
          <Grid item xs={12}>
            <Typography
              sx={{
                fontSize: {
                  xs: "38px",
                  md: "50px"
                },
                background:
                  "linear-gradient(90.42deg, #4AB1F1 0.58%, #566CEC 37.22%, #D749AF 73.87%, #FF7C51 112.26%)",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: "center",
                fontWeight: "bold",
                lineHeight: {
                  xs: "43px",
                  md: "58px"
                },
              }}
              variant="h2"
            >
              Get to Know Your Roommate <br /> Before You Move In
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{
                textAlign: "center",
                color: "#5E646E",
                fontSize: "18px",
                lineHeight: "24px",
              }}
              variant="subtitle1"
            >
              Lorem ipsum dolor sit amet laoreet quis imperdiet quis, consequat
              id lorem.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              ml: "auto",
              mr: "auto",
            }}
          >
            <OutlinedInput
              fullWidth
              onKeyDown={() => navigate("/search")}
              placeholder="Search for a town, locality or street"
              startAdornment={
                <InputAdornment position="start">
                  <RoomOutlinedIcon />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    type="button"
                    onClick={() => navigate("/search")}
                    variant="contained"
                    startIcon={<SearchIcon />}
                    sx={{
                      borderRadius: "40px",
                      backgroundColor: "black", // Black background color
                      color: "white", // White text color
                      textTransform: "none", // Prevent text from being uppercase
                      "&:hover": {
                        backgroundColor: "#333", // Darker shade on hover
                      },
                      mr: "-4px",
                      height: "48px",
                      width: "140px",
                    }}
                  >
                    Search
                  </Button>
                </InputAdornment>
              }
              sx={{
                borderRadius: 10, // Add border-radius to the input field
                paddingRight: "8px", // Adjust padding for better appearance
                background:
                  "linear-gradient(90deg, rgba(255, 233, 244, 0.3) 0%, rgba(234, 243, 255, 0.55) 100%)",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default HeroSection;
