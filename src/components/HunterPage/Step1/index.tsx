import {
  Box,
  Grid,
  OutlinedInput,
  Slider,
  Typography,
} from "@mui/material";
import React from "react";
import CustomButtonGroup from "../../comman/CustomButtonGroup";
import useHunterData from "../../../hooks/useHunter";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import GoogleMaps from "../../GoogleMaps";
import IOSSwitch from "../../comman/IOSSwitch";
import { LoadingButton } from "@mui/lab";

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 30,
    label: "30",
  },
  {
    value: 40,
    label: "40",
  },
  {
    value: 50,
    label: "50",
  },
  {
    value: 60,
    label: "60",
  },
  {
    value: 70,
    label: "70",
  },
  {
    value: 80,
    label: "80",
  },
  {
    value: 90,
    label: "90",
  },
  {
    value: 100,
    label: "100",
  },
];

interface Step1Props {
  updateTabIndex: Function;
}
const Step1: React.FC<Step1Props> = ({ updateTabIndex }) => {
  const {
    accommodation,
    bathroomsAmount,
    propertyTypes,
    roomsAmount,
    tenants,
    commanPreferenceOptions,
    kitchenOptions,
    maximumNumberOfpeopleOptions,
    yesNoOptions,
  } = useHunterData();
  return (
    <Grid container spacing={2} mt={2} mb={2}>
      <Grid item xs={12}>
        <Typography>Step 1/2</Typography>
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
          So you’re looking for a place for yourself...
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: "1px solid black" }}></Box>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>
          What type of accommodation are you interested in?
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={accommodation}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>Type of the property</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={propertyTypes}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>
          Acceptable rent (zł/month)
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={[20, 100]}
          min={0}
          max={600}
          // onChange={handleChange}
          valueLabelDisplay="auto"
          // getAriaValueText={valuetext}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>Maximum deposit</Typography>
      </Grid>

      <Grid item xs={12}>
        <OutlinedInput fullWidth placeholder="No Preferences" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography sx={{ fontSize: "28px" }}>
          When you would like to move in?
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box display={"flex"} alignItems={"center"} justifyContent={"flex-end"}>
          <Typography sx={{ fontSize: "28px" }}>Available Now:</Typography>
          <IOSSwitch />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              sx={{ width: "100%" }}
              label="Controlled picker"
              value={null}
              onChange={(newValue) => console.log(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography sx={{ fontSize: "28px" }}>
          Where would you like to live?
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "18px" }}>
          Type in address or choose a point on the map
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <OutlinedInput fullWidth placeholder="Search an Address" />
      </Grid>
      <Grid item xs={12}>
        <GoogleMaps />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>
          Distance from reference point (km)
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Slider
          aria-label="Restricted values"
          defaultValue={20}
          // getAriaValueText={valuetext}
          step={null}
          valueLabelDisplay="auto"
          marks={marks}
        />
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
          Describe your ideal place
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: "1px solid black" }}></Box>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>
          Minimum propety size (m²)
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <OutlinedInput fullWidth placeholder="100" />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>
          Maximum number of tenants (excluding you)
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={tenants}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>Rooms amount</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={roomsAmount}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>
          Bathroom amount (you can choose many)
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={bathroomsAmount}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>
          Parking (you can choose many)
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={bathroomsAmount}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>Furnished</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={commanPreferenceOptions}
          selectionOption="YES"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>Kitchen</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={kitchenOptions}
          selectionOption="YES"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>
          Balcony in the apartment
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={commanPreferenceOptions}
          selectionOption="YES"
        />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: "1px solid black" }}></Box>
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
          Describe your ideal room
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>
          Maximum number of people in the room (including you)
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={maximumNumberOfpeopleOptions}
          selectionOption="YES"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>
          Minimum room size (m^2)
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <OutlinedInput fullWidth placeholder="No Preferences" />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>Furnished?</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={commanPreferenceOptions}
          selectionOption="YES"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>Private bathroom?</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={yesNoOptions}
          selectionOption="YES"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>Balcony in the room?</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={commanPreferenceOptions}
          selectionOption="YES"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <LoadingButton
          sx={{
            background: "transparent",
            width: "100%",
            p: 1,
            borderRadius: "8px",
            color: "black",
            textTransform: "none",
            letterSpacing: "1px",
            fontWeight: "600",
            fontSize: "24px",
            border: "1px solid gray",
          }}
          type="button"
        >
          Preview
        </LoadingButton>
      </Grid>
      <Grid item xs={12} md={6}>
        <LoadingButton
          sx={{
            background:
              "linear-gradient(to right, #4AB1F1, #566CEC, #D749AF, #FF7C51)",
            width: "100%",
            p: 1,
            borderRadius: "8px",
            color: "white",
            textTransform: "none",
            letterSpacing: "1px",
            fontWeight: "600",
            fontSize: "24px",
          }}
          type="button"
        >
          Preview
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default Step1;
