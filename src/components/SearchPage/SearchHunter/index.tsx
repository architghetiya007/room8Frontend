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
import FILTERSIMG from "../../../assets/landlord/filters.png";
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
  coordinate: Yup.array().of(Yup.number()),
  // .length(2, "Must provide latitude and longitude coordinate") // Coordinates as [latitude, longitude]
});

const hunterSchema = Yup.object().shape({
  accommodation: Yup.string(),
  typeOfProperty: Yup.string(),
  acceptableRentRange: Yup.array()
    .of(Yup.number().min(0, "Rent must be non-negative"))
    .length(2, "Rent range should have two values"),
  address: addressSchema,
  rangeFromCoordinate: Yup.number()
    .min(0, "Range must be non-negative")
    .nullable(),
  minimumPropertySize: Yup.number()
    .min(0, "Minimum property size must be non-negative")
    .max(1000, "Minimum property size should be 1000"),
  roomAmount: Yup.string(),
  minimumNumberOfTenants: Yup.string(),
  flatmatePreference: Yup.array(Yup.string()),
  furnished: Yup.string(),
  whenYouWouldLikeMoveIn: Yup.number().nullable(),
  preferredLengthToStay: Yup.string(),
});
interface SearchHunterProps {
  searchAPI: (data: any) => void;
}
const SearchHunter: React.FC<SearchHunterProps> = ({ searchAPI }) => {
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
      address: {
        streetNumber: "",
        streetName: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        addressLine: "",
        formattedAddress: "",
        coordinate: [],
      },
      rangeFromCoordinate: 3,
      minimumPropertySize: 0,
      roomAmount: "NO_PREFERENCE",
      minimumNumberOfTenants: "NO_PREFERENCE",
      flatmatePreference: [],
      furnished: "NO_PREFERENCE",
      whenYouWouldLikeMoveIn: null,
      preferredLengthToStay: "",
    },
    validationSchema: hunterSchema,
    onSubmit: (values) => {
      console.log(values);
      searchAPI(values);
    },
  });
  console.log(formik.errors);
  return (
    <Box component={"form"} mt={2}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <CommanTypography title={t("accommodationQuestion")} />
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
              <Box
                sx={{
                  width: "25px",
                  height: "25px",
                  textAlign: "center",
                  mt: 1,
                  mr: 1,
                }}
                component={"img"}
                src={FILTERSIMG}
              ></Box>
              <Typography
                sx={{ fontSize: "24px", fontWeight: "600", color: "#3B3D44" }}
              >
                More Filters
              </Typography>
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
                  <CommanTypography title={t("flatmatePreferenceQuestion")} />
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
                  <CommanTypography title={t("preferredLengthToStay")} />
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
            onClick={() => formik.handleSubmit()}
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
