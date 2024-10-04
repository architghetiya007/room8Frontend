import {
  Box,
  Grid,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useCommonTranslation from "../../../hooks/useCommonTranslation";
import useNotification from "../../../hooks/useNotification";
import useAdvertisementMutations from "../../../mutations/advertisement";
import { AdvertisementType } from "../../../utils/advertisement";
import useLandlord from "../../../hooks/useLandlord";
import CustomButtonGroup from "../../comman/CustomButtonGroup";
import OutlinedButton from "../../comman/OutlinedButton";
import CustomLoadingButton from "../../comman/CustomLoadingButton";
import GoogleMapsAutocomplete from "../../comman/GoogleMapsAutoComplete";
import { useNavigate } from "react-router-dom";

const addressSchema = Yup.object().shape({
  streetNumber: Yup.string(), // Corresponds to streetNumber in interface
  streetName: Yup.string(), // Corresponds to streetName in interface
  city: Yup.string(), // Corresponds to city in interface
  state: Yup.string(), // Corresponds to state in interface
  country: Yup.string(), // Corresponds to country in interface
  postalCode: Yup.string(), // Updated for postalCode (was zipCode)
  addressLine: Yup.string(), // Corresponds to addressLine in interface
  formattedAddress: Yup.string(), // Corresponds to formattedAddress in interface
  coordinates: Yup.array().of(Yup.number()),
  // .length(2, "Must provide latitude and longitude coordinates") // Coordinates as [latitude, longitude]
});

const landlordSchema = Yup.object().shape({
  propertyOffer: Yup.string().required("Property offer is required"),
  typeofProperty: Yup.string().required("Type of property is required"),
  address: addressSchema,
  doYouLiveHere: Yup.string().required("Do you live here is required"),
  ownerLiveHere: Yup.string().required("Owner live here is required"),
  howmanyPeopleLive: Yup.string().required("How many people live is required"),
  propertySize: Yup.number().required("Property size is required").min(0),
  roomsAmoount: Yup.string().required("Rooms amount is required"),
  floor: Yup.number().required("Floor is required").min(0),
  numberOfFloor: Yup.number(),
  liftInBuilding: Yup.string().required("Lift in building is required"),
  IsApartmentFurnished: Yup.string().required(
    "Is apartment furnished is required"
  ),
  kitchen: Yup.string().required("Kitchen type is required"),
  parking: Yup.string().required("Parking type is required"),
  balconyInApartment: Yup.string().required(
    "Balcony in apartment is required"
  ),
  // roomSize: Yup.number().required("Room size is required").min(0),
  // howManyPropleInRoom: Yup.string().required(
  //   "How many people in room is required"
  // ),
  // isRoomFurnished: Yup.string().required("Is room furnished is required"),
  // bed: Yup.string().required("Bed information is required"),
  // privateBathroom: Yup.boolean().required("Private bathroom is required"),
  // doesRoomHaveBalcony: Yup.boolean().required(
  //   "Does room have balcony is required"
  // ),
  // dateAvailable: Yup.number().required("Date available is required"),
  // minimumStay: Yup.string().required("Minimum stay is required"),
  // maximumStay: Yup.string().required("Maximum stay is required"),
  // rentPerMonth: Yup.number().required("Rent per month is required").min(0),
  // billIncludeInRent: Yup.string().required("Bill included in rent is required"),
  // deposit: Yup.number().required("Deposit is required").min(0),
  // descriptionOfFlat: Yup.string().required("Description of flat is required"),
  // photosOfPlace: Yup.array().of(Yup.string().required("Photo URL is required")),
  // whoAreYou: Yup.string().required("Who are you is required"),
  // name: Yup.string().required("Name is required"),
  // age: Yup.number().required("Age is required").min(0),
  // haveAnychildren: Yup.boolean().required("Have any children is required"),
  // havePet: Yup.boolean().required("Have pet is required"),
  // typeOfEmployment: Yup.string().required("Type of employment is required"),
  // doYouSmoke: Yup.string().required("Do you smoke is required"),
  // descriptionAbout: Yup.string().required("Description about is required"),
  // flatmateAccepting: Yup.array().of(
  //   Yup.string().required("Flatmate accepting value is required")
  // ),
  // ageOfFutureRoomMate: Yup.array()
  //   .of(Yup.number().required("Age of future roommate is required"))
  //   .min(1, "At least one age value is required"),
  // acceptTenantWithChilder: Yup.string().required(
  //   "Accept tenant with children is required"
  // ),
  // acceptPets: Yup.string().required("Accept pets is required"),
  // acceptSmoking: Yup.string().required("Accept smoking is required"),
  // flatmatePhoto: Yup.string().required("Flatmate photo URL is required"),
  // profilePhoto: Yup.string().required("Profile photo URL is required"),
  // genderOfCurrentTenants: Yup.string().required(
  //   "Gender of current tenants is required"
  // ),
  // currentTenantsName: Yup.string().required(
  //   "Current tenant's name is required"
  // ),
  // ageOfCurrentTenants: Yup.number()
  //   .required("Age of current tenants is required")
  //   .min(0),
  // doChildrenLiveHere: Yup.boolean().required(
  //   "Do children live here is required"
  // ),
  // isPetLivingInApartment: Yup.boolean().required(
  //   "Is pet living in apartment is required"
  // ),
  // currentTenantsEmployment: Yup.string().required(
  //   "Current tenant's employment is required"
  // ),
  // tenantsSmoking: Yup.string().required("Tenants smoking is required"),
  // preferenceOfFutureTenants: Yup.array().of(
  //   Yup.string().required("Preference of future tenant is required")
  // ),
  // ageRangeOfFutureRoommate: Yup.array()
  //   .of(Yup.number().required("Age range of future roommate is required"))
  //   .min(1, "At least one age range value is required"),
  // acceptTenantWithChildren: Yup.string().required(
  //   "Accept tenant with children is required"
  // ),
  // tenantAcceptPets: Yup.string().required("Tenant accepts pets is required"),
});
interface Step1Props {
  updateTabIndex: Function;
}
const Step1: React.FC<Step1Props> = () => {
  const navigate = useNavigate();
  const { t } = useCommonTranslation();
  const { createAdvertisementMutation } = useAdvertisementMutations();
  const { showSnackBar } = useNotification();
  const {
    propertyOfferOptions,
    propertyTypes,
    yesNoOptions,
    howmanyPeopleLive,
    IsApartmentFurnished,
    kitchenOptions,
    parkingOptions,
  } = useLandlord();
  const formik = useFormik({
    initialValues: {
      propertyOffer: "ENTIREROOM",
      typeofProperty: "FLAT",
      address: {
        streetNumber: "",
        streetName: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        addressLine: "",
        formattedAddress: "",
        coordinates: [],
      },
      doYouLiveHere: "YES",
      ownerLiveHere: "YES",
      howmanyPeopleLive: "02",
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
    onSubmit: (values) => {
      const body = {
        advertiseType: AdvertisementType.LANDLORD,
        landlordData: { ...values },
      };
      createAdvertisementMutation.mutate(body, {
        onSuccess: (data) => {
          showSnackBar({ message: data!.message });
          navigate(`/landlord/2/${data?.data._id}`);
        },
        onError: (error: Error) => {
          showSnackBar({ message: error.message, variant: "error" });
        },
      });
    },
  });

  console.log(formik.errors)
  return (
    <Box component={"form"} onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} mt={2} mb={2}>
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
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("propertyOffer", e);
            }}
            selectionOption={formik.values.propertyOffer}
            options={propertyOfferOptions}
          />
        </Grid>
        <Grid item xs={12}>
          Type of the property
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("typeofProperty", e);
            }}
            selectionOption={formik.values.typeofProperty}
            options={propertyTypes}
          />
        </Grid>
        <Grid item xs={12}>
          Address of the place
        </Grid>
        <Grid item xs={12}>
          Don't be afraid - The exact address will be hidden. People will only
          see approximate location
        </Grid>
        <Grid item xs={12}>
          <GoogleMapsAutocomplete
            onClickPlaceDetails={(e) => {
              formik.setFieldValue("address", e);
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
          <CustomButtonGroup
            options={yesNoOptions}
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("doYouLiveHere", e);
            }}
            selectionOption={formik.values.doYouLiveHere}
          />
        </Grid>
        <Grid item xs={12}>
          Does the owner live here?
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            options={yesNoOptions}
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("ownerLiveHere", e);
            }}
            selectionOption={formik.values.ownerLiveHere}
          />
        </Grid>
        <Grid item xs={12}>
          How many people live at this PROPERTY? (including you and new person)
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            options={howmanyPeopleLive}
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("howmanyPeopleLive", e);
            }}
            selectionOption={formik.values.howmanyPeopleLive}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ borderBottom: "1px solid black" }}></Box>
        </Grid>
        <Grid item xs={12}>
          Property Size
        </Grid>
        <Grid item xs={12}>
          <OutlinedInput
            value={formik.values.propertySize}
            onChange={(e) =>
              formik.setFieldValue("propertySize", e.target.value)
            }
            fullWidth
            placeholder="100"
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <Stack flexDirection={"column"} spacing={2}>
                <Typography>Floor</Typography>
                <OutlinedInput
                  value={formik.values.floor}
                  onChange={(e) =>
                    formik.setFieldValue("floor", e.target.value)
                  }
                  fullWidth
                  placeholder="100"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack flexDirection={"column"} spacing={2}>
                <Typography>Number of floors in the building</Typography>
                <OutlinedInput
                  value={formik.values.numberOfFloor}
                  onChange={(e) =>
                    formik.setFieldValue("numberOfFloor", e.target.value)
                  }
                  fullWidth
                  placeholder="100"
                />
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          Lift in the building?
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            options={yesNoOptions}
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("liftInBuilding", e);
            }}
            selectionOption={formik.values.liftInBuilding}
          />
        </Grid>
        <Grid item xs={12}>
          Is the apartment furnished?
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            options={IsApartmentFurnished}
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("IsApartmentFurnished", e);
            }}
            selectionOption={formik.values.IsApartmentFurnished}
          />
        </Grid>
        <Grid item xs={12}>
          Kitchen
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            options={kitchenOptions}
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("kitchen", e);
            }}
            selectionOption={formik.values.kitchen}
          />
        </Grid>
        <Grid item xs={12}>
          Parking
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            options={parkingOptions}
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("parking", e);
            }}
            selectionOption={formik.values.parking}
          />
        </Grid>
        <Grid item xs={12}>
          Balcony in the apartment?
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            options={yesNoOptions}
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("balconyInApartment", e);
            }}
            selectionOption={formik.values.balconyInApartment}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ borderBottom: "1px solid black" }}></Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <OutlinedButton>{t("CANCEL_BUTTON_TEXT")}</OutlinedButton>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomLoadingButton
            loading={createAdvertisementMutation.isPending}
            sx={{ width: "100%" }}
            onClick={() => formik.handleSubmit()}
          >
            {t("landlord.GO_TO_ROOM_DESCRIPTION")}
          </CustomLoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step1;
