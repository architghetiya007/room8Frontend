import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import useCommonTranslation from "../../../hooks/useCommonTranslation";
import CustomButtonGroup from "../../comman/CustomButtonGroup";
import { useFormik } from "formik";
import * as Yup from "yup";
import GoogleMapsAutocomplete from "../../comman/GoogleMapsAutoComplete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useHunterData from "../../../hooks/useHunter";
import CustomLoadingButton from "../../comman/CustomLoadingButton";
import { Search } from "@mui/icons-material";
import CommanTypography from "../../comman/CommonTypography";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import FILTERSIMG from "../../../assets/landlord/filters.png";

const addressSchema = Yup.object().shape({
  streetNumber: Yup.string().optional(), // Corresponds to streetNumber in interface
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
const landlordSchema = Yup.object().shape({
  typeOfProperty: Yup.string(),
  rentPerMonth: Yup.number(),
  typeofProperty: Yup.string(),
  address: addressSchema,
  dateAvailable: Yup.number().nullable(),
  minimumStay: Yup.string(),
  maximumStay: Yup.string(),
  furnished: Yup.array(Yup.string()),
  parking: Yup.array(Yup.string()),
  flatmateAccepting: Yup.array(Yup.string()),
});
interface SearchLandlordProps {
  searchAPI: (data: any) => void;
}
const SearchLandlord: React.FC<SearchLandlordProps> = ({ searchAPI }) => {
  const { t } = useCommonTranslation();
  const {
    propertyTypes,
    iamAcceptingOptions,
    duration,
    parkingOptions,
    commanPreferenceOptions,
  } = useHunterData();
  const formik = useFormik({
    initialValues: {
      typeOfProperty: "",
      rentPerMonth: 0,
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
      dateAvailable: null,
      minimumStay: "",
      maximumStay: "",
      parking: [],
      furnished: [],
      flatmateAccepting: [],
    },
    validationSchema: landlordSchema,
    onSubmit: (values) => {
      console.log(values);
      searchAPI(values);
    },
  });
  return (
    <Box component={"form"} mt={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.whatTypefPropertyOffer")} />
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
          <CommanTypography title={t("landlordQ.rentPerMonth")} />
        </Grid>
        <Grid item xs={12}>
          <OutlinedInput
            value={formik.values.rentPerMonth}
            onChange={(e) =>
              formik.setFieldValue("rentPerMonth", e.target.value)
            }
            fullWidth
            placeholder="100"
            type="number"
            inputProps={{
              min: "0",
              max: "1000",
            }}
            error={formik.touched.rentPerMonth && !!formik.errors.rentPerMonth}
          />
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.addressofPlace")} />
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
                <Grid item xs={12} md={6}>
                  <CommanTypography title={t("landlordQ.datesAvailable")} />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        sx={{ width: "100%" }}
                        label="Date"
                        format="DD/MM/YYYY"
                        minDate={dayjs(new Date())}
                        maxDate={dayjs(new Date()).add(1, "year")}
                        value={
                          formik.values?.dateAvailable
                            ? dayjs(formik.values?.dateAvailable)
                            : null
                        }
                        onChange={(newValue) => {
                          formik.setFieldValue(
                            "dateAvailable",
                            newValue?.valueOf()
                          );
                          formik.setFieldValue("isAvailableNow", false);
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6}></Grid>
                <Grid item xs={12} md={6}>
                  <Stack>
                    <CommanTypography
                      title={t("landlordQ.minimunLengthofStay")}
                    />
                    <FormControl fullWidth>
                      <Select
                        labelId="work-status-label"
                        id="work-status"
                        value={formik.values.minimumStay}
                        onChange={(e) => {
                          formik.setFieldValue("minimumStay", e.target.value);
                        }}
                        displayEmpty
                      >
                        <MenuItem value="">Select</MenuItem>
                        {duration.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {t(option.name)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack>
                    <CommanTypography
                      title={t("landlordQ.maximunLengthofStay")}
                    />
                    <FormControl fullWidth>
                      <Select
                        labelId="work-status-label"
                        id="work-status"
                        value={formik.values.maximumStay}
                        onChange={(e) => {
                          formik.setFieldValue("maximumStay", e.target.value);
                        }}
                        displayEmpty
                      >
                        <MenuItem value="">Select</MenuItem>
                        {duration.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {t(option.name)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack>
                    <CommanTypography title={t("landlordQ.searchFurnished")} />
                    <CustomButtonGroup
                      multiSelect={true}
                      optionClick={(e: string[] | string) => {
                        formik.setFieldValue("furnished", e);
                      }}
                      selectionOption={formik.values.furnished}
                      options={commanPreferenceOptions}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack>
                    <CommanTypography title={t("landlordQ.parking")} />
                    <CustomButtonGroup
                      multiSelect={true}
                      optionClick={(e: string[] | string) => {
                        formik.setFieldValue("parking", e);
                      }}
                      selectionOption={formik.values.parking}
                      options={parkingOptions}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <CommanTypography title={t("landlordQ.iamAccepting")} />
                </Grid>
                <Grid item xs={12}>
                  <CustomButtonGroup
                    optionClick={(e: string[] | string) => {
                      formik.setFieldValue("flatmateAccepting", e);
                    }}
                    multiSelect={true}
                    selectionOption={formik.values.flatmateAccepting}
                    options={iamAcceptingOptions}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12} mt={4} mb={2}>
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

export default SearchLandlord;
