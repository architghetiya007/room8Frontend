import { Box, Grid, OutlinedInput, Slider, Typography } from "@mui/material";
import React from "react";
import CustomButtonGroup from "../../comman/CustomButtonGroup";
import useHunterData from "../../../hooks/useHunter";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import GoogleMaps from "../../GoogleMaps";
import IOSSwitch from "../../comman/IOSSwitch";
import CustomLoadingButton from "../../comman/CustomLoadingButton";
import OutlinedButton from "../../comman/OutlinedButton";
import useCommonTranslation from "../../../hooks/useCommonTranslation";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAdvertisementMutations from "../../../mutations/advertisement";
import useNotification from "../../../hooks/useNotification";
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

const addressSchema = Yup.object().shape({
  street: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  country: Yup.string(),
  zipCode: Yup.string().matches(/^\d{5}$/, "Invalid Zip Code"),
  coordinate: Yup.array()
    .of(Yup.number())
    .length(2, "Must provide latitude and longitude coordinates"),
  rowText: Yup.string(),
});

const accommodationSchema = Yup.object().shape({
  accommodation: Yup.string().oneOf(["ENTIREROOM", "SHAREDROOM", "PRIVATE"]),
  typeOfProperty: Yup.string().oneOf(["FLAT", "HOUSE", "STUDIO"]),
  acceptableRentRange: Yup.array()
    .of(Yup.number().min(0, "Rent must be non-negative"))
    .length(2, "Rent range should have two values"),
  maximumDeposit: Yup.number().min(0, "Deposit must be non-negative"),
  whenYouWouldLikeMoveIn: Yup.number().typeError(
    "Invalid timestamp for move-in date"
  ),
  preferredLengthToStay: Yup.string().oneOf([
    "NO_PREFERENCE",
    "SHORT_TERM",
    "LONG_TERM",
  ]),
  address: addressSchema,
  rangeFromCoordinate: Yup.number().min(0, "Range must be non-negative"),
  minimumPropertySize: Yup.number().min(
    0,
    "Minimum property size must be non-negative"
  ),
  minimumNumberOfTenants: Yup.string(),
  roomAmount: Yup.string(),
  bathroomAmount: Yup.string(),
  parking: Yup.string().oneOf(["PUBLIC", "PRIVATE", "NONE"]),
  furnished: Yup.string().oneOf(["YES", "NO"]),
  kitchen: Yup.string().oneOf(["SEPARATE", "OPEN"]),
  balcony: Yup.string().oneOf(["YES", "NO"]),
});
interface Step1Props {
  updateTabIndex: Function;
}
const Step1: React.FC<Step1Props> = ({ updateTabIndex }) => {
  const { t } = useCommonTranslation();
  const { createAdvertisementMutation } = useAdvertisementMutations();
  const { showSnackBar } = useNotification();
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

  useFormik({
    initialValues: {},
    validationSchema: accommodationSchema,
    onSubmit: (values: any) => {
      createAdvertisementMutation.mutate(values, {
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
    <Grid container spacing={2} mt={2} mb={2}>
      <Grid item xs={12}>
        <Typography>Step 1/2</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          sx={{
            background:
              "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t("hunterStep1Title")}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: "1px solid black" }}></Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{t("accommodationQuestion")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={accommodation}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{t("typeOfPropertyQuestion")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={propertyTypes}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{t("acceptableRentRangeQuestion")}</Typography>
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
        <Typography variant="h5">{t("maximumDepositQuestion")}</Typography>
      </Grid>

      <Grid item xs={12}>
        <OutlinedInput fullWidth placeholder="No Preferences" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h5">
          {t("whenYouWouldLikeMoveInQuestion")}?
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box display={"flex"} alignItems={"center"} justifyContent={"flex-end"}>
          <Typography variant="h5">{t("availableNow")}</Typography>
          <IOSSwitch />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              sx={{ width: "100%" }}
              label="Date"
              value={null}
              onChange={(newValue) => console.log(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h5">{t("addressQuestion")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1">{t("addressSubTitle")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <OutlinedInput fullWidth placeholder="Search an Address" />
      </Grid>
      <Grid item xs={12}>
        <GoogleMaps />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{t("rangeFromCoordinateQuestion")}</Typography>
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
          {t("describeYourPlace")}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: "1px solid black" }}></Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{t("minimumPropertySizeQuestion")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <OutlinedInput fullWidth placeholder="100" />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">
          {t("minimumNumberOfTenantsQuestion")}
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
        <Typography variant="h5">{t("roomAmountQuestion")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={roomsAmount}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{t("bathroomAmountQuestion")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={bathroomsAmount}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{t("parkingQuestion")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={bathroomsAmount}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{t("furnishedQuestion")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={commanPreferenceOptions}
          selectionOption="YES"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{t("kitchenQuestion")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={kitchenOptions}
          selectionOption="YES"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{t("balconyQuestion")}</Typography>
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
          {t("describeIdelRoom")}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">
          {t("maximumNumberOfpeopleQuestion")}
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
        <Typography variant="h5">{t("minimumRoomSizeQuestion")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <OutlinedInput fullWidth placeholder="No Preferences" />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{t("furnishedRoomQuestion")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={commanPreferenceOptions}
          selectionOption="YES"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{t("privateBathroomQuestion")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={yesNoOptions}
          selectionOption="YES"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{t("balconyInRoomQuestion")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={commanPreferenceOptions}
          selectionOption="YES"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <OutlinedButton>{t("CANCEL_BUTTON_TEXT")}</OutlinedButton>
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomLoadingButton
          sx={{ width: "100%" }}
          onClick={() => updateTabIndex()}
        >
          {t("NEXT_BUTTON_TEXT")}
        </CustomLoadingButton>
      </Grid>
    </Grid>
  );
};

export default Step1;
