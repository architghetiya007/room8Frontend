import { Avatar, Box, Grid, OutlinedInput, Stack, Typography } from "@mui/material";
import React from "react";
import useHunterData from "../../../hooks/useHunter";
import CustomButtonGroup from "../../comman/CustomButtonGroup";
import { LoadingButton } from "@mui/lab";
interface Step2Props {
  updateTabIndex: Function;
}
const Step2: React.FC<Step2Props> = ({ updateTabIndex }) => {
  const { whoAreYou, yesNoOptions, smokingOptions, yesNoPreferenceOptions } =
    useHunterData();
  return (
    <Grid container spacing={2} mt={2} mb={2}>
      <Grid item xs={12}>
        <Typography>Step 2/2</Typography>
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
          Now, tell something about yourself...
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: "1px solid black" }}></Box>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>Who are you?</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={whoAreYou}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack direction={"column"}>
          <Typography sx={{ fontSize: "28px" }}>What's your name?</Typography>
          <OutlinedInput fullWidth placeholder="No Preferences" />
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack direction={"column"}>
          <Typography sx={{ fontSize: "28px" }}>Your Age</Typography>
          <OutlinedInput fullWidth placeholder="No Preferences" />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>
          Are you looking with a child for a place to live?
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={yesNoOptions}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>Do you have a pet?</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={yesNoOptions}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>
          What do you do/type of employment?
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>Are you smoking?</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={smokingOptions}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack direction={"column"}>
          <Typography sx={{ fontSize: "28px" }}>
            Your partner/friend's name
          </Typography>
          <OutlinedInput fullWidth placeholder="No Preferences" />
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack direction={"column"}>
          <Typography sx={{ fontSize: "28px" }}>His/Her age</Typography>
          <OutlinedInput fullWidth placeholder="No Preferences" />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>Gender</Typography>
      </Grid>
      <Grid item xs={12}>
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
          Add Another Person
        </LoadingButton>
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
          Your flatmate preferences
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: "1px solid black" }}></Box>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>
          I’m accepting (you can choose many)
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={smokingOptions}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>
          Do you accept living with an owner?
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={yesNoPreferenceOptions}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>
          Do you accept tenants with children?
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={yesNoPreferenceOptions}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>Do you accept a pet?</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={yesNoPreferenceOptions}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>
          Do you accept smoking?
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={smokingOptions}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: "1px solid black" }}></Box>
      </Grid>
      <Grid item xs={12}>
        <Stack
        spacing={2}
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
          sx={{ border: "1px solid red", borderRadius: "8px", p: 4 }}
        >
          <Typography variant="h6">Add Your Photo</Typography>
          <Typography>Photos increase the chance of finding the perfect match</Typography>
          <Typography> You can also add them later</Typography>
          <Avatar  sx={{
          width: 80, // Set the width
          height: 80, // Set the height
        }}></Avatar>
         <LoadingButton
          sx={{
            background:
              "linear-gradient(to right, #4AB1F1, #566CEC, #D749AF, #FF7C51)",
            // width: "100px",
            px: 4,
            borderRadius: "50px",
            color: "white",
            textTransform: "none",
            letterSpacing: "1px",
            fontWeight: "600",
            fontSize: "24px",
          }}
          type="button"
        >
          Upload Photo
        </LoadingButton>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "28px" }}>
          Write a few sentences about yourself so others can get to know you
          better
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "14px" }}>
          (Tell about your ideal roommates and a little about yourself. What you
          do for work, what you like to do for fun, or where you're from. Also,
          be sure to let them know what you're looking for){" "}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <OutlinedInput
          multiline
          minRows={4}
          fullWidth
          placeholder="Your Message"
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

export default Step2;
