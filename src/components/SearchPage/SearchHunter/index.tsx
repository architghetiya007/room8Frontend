import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
  Typography,
} from "@mui/material";
import { t } from "i18next";
import CommanTypography from "../../comman/CommonTypography";
import CustomButtonGroup from "../../comman/CustomButtonGroup";
import useHunterData from "../../../hooks/useHunter";
import { useFormik } from "formik";
import * as Yup from "yup";
import GoogleMapsAutocomplete from "../../comman/GoogleMapsAutoComplete";
import { Search } from "@mui/icons-material";
import CustomLoadingButton from "../../comman/CustomLoadingButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const marks = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 6,
    label: "6",
  },
  {
    value: 7,
    label: "7",
  },
  {
    value: 8,
    label: "8",
  },
  {
    value: 9,
    label: "9",
  },
  {
    value: 10,
    label: "10",
  },
];
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

const hunterSchema = Yup.object().shape({
  accommodation: Yup.string(),
  typeOfProperty: Yup.string(),
  acceptableRentRange: Yup.array()
    .of(Yup.number().min(0, "Rent must be non-negative"))
    .length(2, "Rent range should have two values"),
  maximumDeposit: Yup.number()
    .min(0, "Deposit must be non-negative")
    .max(50000, "Deposit max should 50000")
    .required("Maximum Deposit is required"),
  whenYouWouldLikeMoveIn: Yup.number()
    .required("When You Would Like MoveIn is required")
    .typeError("Invalid timestamp for move-in date"),
  isAvailableNow: Yup.boolean(),
  preferredLengthToStay: Yup.string(),
  address: addressSchema,
  flatmatePreference: Yup.array(Yup.string()),
  rangeFromCoordinate: Yup.number()
    .min(0, "Range must be non-negative")
    .nullable(),
  minimumPropertySize: Yup.number()
    .min(0, "Minimum property size must be non-negative")
    .max(1000, "Minimum property size should be 1000")
    .required("Minimum property size is required"),
  minimumNumberOfTenants: Yup.string(),
  roomAmount: Yup.string(),
  bathroomAmount: Yup.string(),
  parking: Yup.array().of(Yup.string()),
  furnished: Yup.string(),
  kitchen: Yup.string(),
  balcony: Yup.string(),
  maximumNumberOfpeople: Yup.string(),
  minimumRoomSize: Yup.number()
    .min(0, "Range must be non-negative")
    .max(100, "Maximum room size should be 100")
    .nullable(),
  furnishedRoom: Yup.string(),
  privateBathroom: Yup.string(),
  balconyInRoom: Yup.string(),
});
const SearchHunter: React.FC = () => {
  const {
    accommodation,
    propertyTypes,
    roomsAmount,
    tenants,
    commanPreferenceOptions,
    duration,
    iamAcceptingOptions,
  } = useHunterData();

  const formik = useFormik({
    initialValues: {
      accommodation: "ENTIREROOM",
      typeOfProperty: "FLAT",
      acceptableRentRange: [3000, 6000],
      maximumDeposit: "",
      whenYouWouldLikeMoveIn: null,
      isAvailableNow: true,
      preferredLengthToStay: "NO_PREFERENCE",
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
      flatmatePreference: [],
      rangeFromCoordinate: 3,
      minimumPropertySize: "",
      minimumNumberOfTenants: "NO_PREFERENCE",
      roomAmount: "NO_PREFERENCE",
      bathroomAmount: "01",
      parking: ["NO_PREFERENCE"],
      furnished: "NO_PREFERENCE",
      kitchen: "NO_PREFERENCE",
      balcony: "NO_PREFERENCE",
      maximumNumberOfpeople: "NO_PREFERENCE",
      minimumRoomSize: "",
      furnishedRoom: "NO_PREFERENCE",
      privateBathroom: "YES",
      balconyInRoom: "NO_PREFERENCE",
    },
    validationSchema: hunterSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Box component={"form"} mt={2}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5">{t("accommodationQuestion")}</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("accommodation", e);
            }}
            selectionOption={formik.values.accommodation}
            options={accommodation}
          />
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("typeOfPropertyQuestion")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("typeOfProperty", e);
            }}
            selectionOption={formik.values.typeOfProperty}
            options={propertyTypes}
          />
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("acceptableRentRangeQuestion")} />
        </Grid>
        <Grid item xs={12}>
          <Slider
            getAriaLabel={() => "Temperature range"}
            min={0}
            step={50}
            max={10000}
            valueLabelDisplay="auto"
            value={formik.values.acceptableRentRange}
            onChange={(_, newValue) => {
              formik.setFieldValue("acceptableRentRange", newValue);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CommanTypography title={t("addressQuestion")} />
        </Grid>
        <Grid item xs={12}>
          <GoogleMapsAutocomplete
            onClickPlaceDetails={(e) => {
              formik.setFieldValue("address", e);
            }}
            selectedAddress={formik.values.address?.formattedAddress ?? ""}
          />
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("rangeFromCoordinateQuestion")} />
        </Grid>
        <Grid item xs={12}>
          <Slider
            aria-label="Restricted values"
            value={formik.values.rangeFromCoordinate}
            onChange={(_, newValue) => {
              formik.setFieldValue("rangeFromCoordinate", newValue);
            }}
            step={1}
            valueLabelDisplay="auto"
            marks={marks}
            max={10}
            min={1}
          />
        </Grid>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              More Filters
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CommanTypography title={t("minimumPropertySizeQuestion")} />
                </Grid>
                <Grid item xs={12}>
                  <OutlinedInput
                    value={formik.values.minimumPropertySize}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "minimumPropertySize",
                        e.target.value
                      )
                    }
                    type="number"
                    fullWidth
                    placeholder="100"
                    inputProps={{
                      min: "0",
                      max: "1000",
                    }}
                    error={
                      formik.touched.minimumPropertySize &&
                      !!formik.errors.minimumPropertySize
                    }
                  />
                  {formik.errors.minimumPropertySize && (
                    <FormHelperText sx={{ color: "red" }}>
                      {formik.errors.minimumPropertySize.toString()}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <CommanTypography
                    title={t("minimumNumberOfTenantsQuestion")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomButtonGroup
                    optionClick={(e: string[] | string) => {
                      formik.setFieldValue("minimumNumberOfTenants", e);
                    }}
                    selectionOption={formik.values.minimumNumberOfTenants}
                    options={tenants}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CommanTypography title={t("roomAmountQuestion")} />
                </Grid>
                <Grid item xs={12}>
                  <CustomButtonGroup
                    optionClick={(e: string[] | string) => {
                      formik.setFieldValue("roomAmount", e);
                    }}
                    selectionOption={formik.values.roomAmount}
                    options={roomsAmount}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    {t("flatmatePreferenceQuestion")}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <CustomButtonGroup
                    optionClick={(e: string[] | string) => {
                      formik.setFieldValue("flatmatePreference", e);
                    }}
                    multiSelect={true}
                    selectionOption={formik.values?.flatmatePreference ?? []}
                    options={iamAcceptingOptions}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CommanTypography title={t("furnishedQuestion")} />
                </Grid>
                <Grid item xs={12}>
                  <CustomButtonGroup
                    optionClick={(e: string[] | string) => {
                      formik.setFieldValue("furnished", e);
                    }}
                    selectionOption={formik.values.furnished}
                    options={commanPreferenceOptions}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    {t("preferredLengthToStay")}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Select
                      labelId="work-status-label"
                      id="work-status"
                      value={formik.values.preferredLengthToStay}
                      onChange={(e) => {
                        formik.setFieldValue(
                          "preferredLengthToStay",
                          e.target.value
                        );
                      }}
                    >
                      {duration.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {t(option.name)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <CustomLoadingButton
            sx={{ width: "100%", height: "60px" }}
            type="button"
          >
            <Search />
            <Typography variant="h5" sx={{ ml: 1 }}>
              Search
            </Typography>
          </CustomLoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchHunter;
