import {
  Box,
  Button,
  ButtonGroup,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

interface Step2Props {
  updateTabIndex: Function;
}
const Step2: React.FC<Step2Props> = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>Step 2/3</Typography>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: "1px solid black" }}></Box>
      </Grid>
      <Grid item xs={12}>
        Room Size
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
        How many people can the room accommodate?
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
        Is the room furnished?
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
          <Button>PARTIALLY</Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12}>
        Bed
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
          <Button>SINGLE</Button>
          <Button>DOUBLE</Button>
          <Button>COUCH</Button>
          <Button>NO BED</Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12}>
        Private bathroom?
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
        Private bathroom?
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
        Does the room have a balcony?
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
        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          <Typography>Date available: </Typography>
          <Box>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Available Now:"
              labelPlacement="start"
            />
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};
export default Step2;
