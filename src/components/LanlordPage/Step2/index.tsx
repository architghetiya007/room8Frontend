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
import { useFormik } from "formik";
import * as Yup from "yup";
import { AdvertisementType } from "../../../utils/advertisement";
import useLandlord from "../../../hooks/useLandlord";
import useAdvertisementMutations from "../../../mutations/advertisement";
import useNotification from "../../../hooks/useNotification";
const landlordSchema = Yup.object().shape({
  roomSize: Yup.number().required("Room size is required").min(0),
  howManyPropleInRoom: Yup.string().required(
    "How many people in room is required"
  ),
  isRoomFurnished: Yup.string().required("Is room furnished is required"),
  bed: Yup.string().required("Bed information is required"),
  privateBathroom: Yup.boolean().required("Private bathroom is required"),
  doesRoomHaveBalcony: Yup.boolean().required(
    "Does room have balcony is required"
  ),
  dateAvailable: Yup.number().required("Date available is required"),
  minimumStay: Yup.string().required("Minimum stay is required"),
  maximumStay: Yup.string().required("Maximum stay is required"),
  rentPerMonth: Yup.number().required("Rent per month is required").min(0),
  billIncludeInRent: Yup.string().required("Bill included in rent is required"),
  deposit: Yup.number().required("Deposit is required").min(0),
  descriptionOfFlat: Yup.string().required("Description of flat is required"),
  photosOfPlace: Yup.array().of(Yup.string().required("Photo URL is required")),
  whoAreYou: Yup.string().required("Who are you is required"),
  name: Yup.string().required("Name is required"),
  age: Yup.number().required("Age is required").min(0),
  haveAnychildren: Yup.boolean().required("Have any children is required"),
  havePet: Yup.boolean().required("Have pet is required"),
  typeOfEmployment: Yup.string().required("Type of employment is required"),
  doYouSmoke: Yup.string().required("Do you smoke is required"),
  descriptionAbout: Yup.string().required("Description about is required"),
  flatmateAccepting: Yup.array().of(
    Yup.string().required("Flatmate accepting value is required")
  ),
  ageOfFutureRoomMate: Yup.array()
    .of(Yup.number().required("Age of future roommate is required"))
    .min(1, "At least one age value is required"),
  acceptTenantWithChilder: Yup.string().required(
    "Accept tenant with children is required"
  ),
  acceptPets: Yup.string().required("Accept pets is required"),
  acceptSmoking: Yup.string().required("Accept smoking is required"),
  flatmatePhoto: Yup.string().required("Flatmate photo URL is required"),
  profilePhoto: Yup.string().required("Profile photo URL is required"),
  genderOfCurrentTenants: Yup.string().required(
    "Gender of current tenants is required"
  ),
  currentTenantsName: Yup.string().required(
    "Current tenant's name is required"
  ),
  ageOfCurrentTenants: Yup.number()
    .required("Age of current tenants is required")
    .min(0),
  doChildrenLiveHere: Yup.boolean().required(
    "Do children live here is required"
  ),
  isPetLivingInApartment: Yup.boolean().required(
    "Is pet living in apartment is required"
  ),
  currentTenantsEmployment: Yup.string().required(
    "Current tenant's employment is required"
  ),
  tenantsSmoking: Yup.string().required("Tenants smoking is required"),
  preferenceOfFutureTenants: Yup.array().of(
    Yup.string().required("Preference of future tenant is required")
  ),
  ageRangeOfFutureRoommate: Yup.array()
    .of(Yup.number().required("Age range of future roommate is required"))
    .min(1, "At least one age range value is required"),
  acceptTenantWithChildren: Yup.string().required(
    "Accept tenant with children is required"
  ),
  tenantAcceptPets: Yup.string().required("Tenant accepts pets is required"),
});

interface Step2Props {
  updateTabIndex: Function;
}
const Step2: React.FC<Step2Props> = () => {
  // const { t } = useCommonTranslation();
  const { createAdvertisementMutation } = useAdvertisementMutations();
  const { showSnackBar } = useNotification();
  const {} = useLandlord();
  const formik = useFormik({
    initialValues: {
      propertyOffer: "ENTIREROOM",
      typeOfProperty: "FLAT",
      address: {
        street: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        coordinate: [0, 0],
        rowText: "",
      },
      doYouLiveHere: "YES",
      ownerLiveHere: "YES",
      howmanyPeopleLive: "",
      propertySize: "02",
      roomsAmoount: "02+",
      floor: "01",
      numberOfFloor: "",
      liftInBuilding: "YES",
      IsApartmentFurnished: "FULLY",
      kitchen: "SEPARATE",
      parking: "DEDICATED",
      balconyInApartment: "YES",
    },
    validationSchema: landlordSchema,
    onSubmit: (values: any) => {
      const body = {
        advertiseType: AdvertisementType.HUNTER,
        hunterData: { ...values },
      };
      createAdvertisementMutation.mutate(body, {
        onSuccess: (data) => {
          showSnackBar({ message: data!.message });
        },
        // onError: (error: Error) => {
        //   // showSnackBar({ message: error.message, variant: "error" });
        // },
      });
    },
  });
  return (
    <Box component={"form"} onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} mt={2} mb={2}>
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
    </Box>
  );
};
export default Step2;
