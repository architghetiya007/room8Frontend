import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
interface Step1Props {
  updateTabIndex: Function;
}
const Step1: React.FC<Step1Props> = ({ updateTabIndex }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>Step 1/3</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          sx={{
            background:
              "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "44px",
          }}
        >
          So you want to rent out your place...
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: "1px solid black" }}></Box>
      </Grid>
      <Grid item xs={12}>
        What type of accommodation are you interested in?
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          sx={{
            boxShadow: "none",
            "& > *": { margin: "0 8px" },
            "& .MuiButton-root": {
              margin: 1, // Adjust spacing here
              width: "100%",
              p: 1,
              borderRadius: 1,
            },
            width: "100%",
          }} // Adjust spacing here
        >
          <Button>ENTIRE ROOM</Button>
          <Button>SHARED ROOM</Button>
          <Button>WHOLE PROPERTY</Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12}>
        Type of the property
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          sx={{
            boxShadow: "none",
            "& > *": { margin: "0 8px" },
            "& .MuiButton-root": {
              margin: 1, // Adjust spacing here
              width: "100%",
              p: 1,
              borderRadius: 1,
            },
            width: "100%",
          }} // Adjust spacing here
        >
          <Button>FLAT</Button>
          <Button>HOUSE</Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12}>
        Address of the place
      </Grid>
      <Grid item xs={12}>
        Don't be afraid - The exact address will be hidden. People will only see
        approximate location
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          placeholder="Search for an address"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: "100%", // Adjust width as needed
            "& .MuiInputBase-root": {
              borderRadius: "4px", // Adjust border radius as needed
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: "1px solid black" }}></Box>
      </Grid>
      <Grid item xs={12}>
        Tell us more about your place
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: "1px solid black" }}></Box>
      </Grid>
      <Grid item xs={12}>
        Do you live here?
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          sx={{
            boxShadow: "none",
            "& > *": { margin: "0 8px" },
            "& .MuiButton-root": {
              margin: 1, // Adjust spacing here
              width: "100%",
              p: 1,
              borderRadius: 1,
            },
            width: "100%",
          }} // Adjust spacing here
        >
          <Button>YES</Button>
          <Button>NO</Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12}>
        Does the owner live here?
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          sx={{
            boxShadow: "none",
            "& > *": { margin: "0 8px" },
            "& .MuiButton-root": {
              margin: 1, // Adjust spacing here
              width: "100%",
              p: 1,
              borderRadius: 1,
            },
            width: "100%",
          }} // Adjust spacing here
        >
          <Button>YES</Button>
          <Button>NO</Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12}>
        How many people live at this PROPERTY? (including you and new person)
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          sx={{
            boxShadow: "none",
            "& > *": { margin: "0 8px" },
            "& .MuiButton-root": {
              margin: 1, // Adjust spacing here
              width: "100%",
              p: 1,
              borderRadius: 1,
            },
            width: "100%",
          }} // Adjust spacing here
        >
          <Button>01</Button>
          <Button>02</Button>
          <Button>03</Button>
          <Button>04+</Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: "1px solid black" }}></Box>
      </Grid>
      <Grid item xs={12}>
        Property Size
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          placeholder="100 m^2"
          sx={{
            width: "100%", // Adjust width as needed
            "& .MuiInputBase-root": {
              borderRadius: "4px", // Adjust border radius as needed
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Stack flexDirection={"column"} spacing={2}>
              <Typography>Floor</Typography>
              <TextField
                variant="outlined"
                placeholder="0 (GROUND)"
                sx={{
                  width: "100%", // Adjust width as needed
                  "& .MuiInputBase-root": {
                    borderRadius: "4px", // Adjust border radius as needed
                  },
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack flexDirection={"column"} spacing={2}>
              <Typography>Number of floors in the building</Typography>
              <TextField
                variant="outlined"
                placeholder="10"
                sx={{
                  width: "100%", // Adjust width as needed
                  "& .MuiInputBase-root": {
                    borderRadius: "4px", // Adjust border radius as needed
                  },
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        Lift in the building?
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          sx={{
            boxShadow: "none",
            "& > *": { margin: "0 8px" },
            "& .MuiButton-root": {
              margin: 1, // Adjust spacing here
              width: "100%",
              p: 1,
              borderRadius: 1,
            },
            width: "100%",
          }} // Adjust spacing here
        >
          <Button>YES</Button>
          <Button>NO</Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12}>
        Is the apartment furnished?
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          sx={{
            boxShadow: "none",
            "& > *": { margin: "0 8px" },
            "& .MuiButton-root": {
              margin: 1, // Adjust spacing here
              width: "100%",
              p: 1,
              borderRadius: 1,
            },
            width: "100%",
          }} // Adjust spacing here
        >
          <Button>FULL</Button>
          <Button>PARTIAL</Button>
          <Button>LACK</Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12}>
        Kitchen
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          sx={{
            boxShadow: "none",
            "& > *": { margin: "0 8px" },
            "& .MuiButton-root": {
              margin: 1, // Adjust spacing here
              width: "100%",
              p: 1,
              borderRadius: 1,
            },
            width: "100%",
          }} // Adjust spacing here
        >
          <Button>SEPARATE</Button>
          <Button>KITCHENETTE</Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12}>
        Parking
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          sx={{
            boxShadow: "none",
            "& > *": { margin: "0 8px" },
            "& .MuiButton-root": {
              margin: 1, // Adjust spacing here
              width: "100%",
              p: 1,
              borderRadius: 1,
            },
            width: "100%",
          }} // Adjust spacing here
        >
          <Button>PUBLIC/ON THE STREET</Button>
          <Button>ASSIGNED SEAT</Button>
          <Button>IN THE GARAGE</Button>
          <Button>LACK</Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12}>
        Balcony in the apartment?
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          sx={{
            boxShadow: "none",
            "& > *": { margin: "0 8px" },
            "& .MuiButton-root": {
              margin: 1, // Adjust spacing here
              width: "100%",
              p: 1,
              borderRadius: 1,
            },
            width: "100%",
          }} // Adjust spacing here
        >
          <Button>YES</Button>
          <Button>NO</Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: "1px solid black" }}></Box>
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          sx={{
            boxShadow: "none",
            "& > *": { margin: "0 8px" },
            "& .MuiButton-root": {
              margin: 1, // Adjust spacing here
              width: "100%",
              p: 1,
              borderRadius: 1,
            },
            width: "100%",
          }} // Adjust spacing here
        >
          <Button>CANCEL</Button>
          <Button type="button" onClick={() => updateTabIndex()}>
            Go to Room Description
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default Step1;
