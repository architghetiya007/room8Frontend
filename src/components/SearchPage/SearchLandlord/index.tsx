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
import useLandlord from "../../../hooks/useLandlord";
import GoogleMapsAutocomplete from "../../comman/GoogleMapsAutoComplete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useHunterData from "../../../hooks/useHunter";
import CustomLoadingButton from "../../comman/CustomLoadingButton";
import { Search } from "@mui/icons-material";

const addressSchema = Yup.object().shape({
  streetNumber: Yup.string().optional(), // Corresponds to streetNumber in interface
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
  rentPerMonth: Yup.number(),
  typeofProperty: Yup.string().required("Type of property is required"),
  address: addressSchema,
  minimumStay: Yup.string(),
  maximumStay: Yup.string(),
  furnished: Yup.string(),
  parking: Yup.string(),
  flatmateAccepting: Yup.string(),
});
const SearchLandlord: React.FC = () => {
  const { t } = useCommonTranslation();
  const { propertyOfferOptions, yesNoOptions, iamAcceptingOptions } =
    useLandlord();
  const { duration } = useHunterData();
  const formik = useFormik({
    initialValues: {
      propertyOffer: "ENTIREROOM",
      rentPerMonth: "FLAT",
      minimumStay: "",
      maximumStay: "",
      parking: "",
      furnished: "",
      flatmateAccepting: "",
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
    },
    validationSchema: landlordSchema,
    onSubmit: (values) => {
        console.log(values)
    },
  });
  return (
    <Box component={"form"} mt={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">
            {t("landlordQ.whatTypefPropertyOffer")}
          </Typography>
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
          <Typography variant="h5">Rent Per Month</Typography>
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
          <Typography variant="h5">{t("landlordQ.addressofPlace")}</Typography>
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
              More Filters
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5">Date Available</Typography>
                </Grid>
                <Grid item xs={12} md={6}></Grid>
                <Grid item xs={12} md={6}>
                  <Stack>
                    <Typography variant="h5">Minimum length of stay</Typography>
                    <FormControl fullWidth>
                      <Select
                        labelId="work-status-label"
                        id="work-status"
                        value={formik.values.minimumStay}
                        onChange={(e) => {
                          formik.setFieldValue("minimumStay", e.target.value);
                        }}
                      >
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
                    <Typography variant="h5">Maximum length of stay</Typography>
                    <FormControl fullWidth>
                      <Select
                        labelId="work-status-label"
                        id="work-status"
                        value={formik.values.minimumStay}
                        onChange={(e) => {
                          formik.setFieldValue("minimumStay", e.target.value);
                        }}
                      >
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
                    <Typography variant="h5">Furnished</Typography>
                    <FormControl fullWidth>
                      <Select
                        labelId="work-status-label"
                        id="work-status"
                        value={formik.values.furnished}
                        onChange={(e) => {
                          formik.setFieldValue("furnished", e.target.value);
                        }}
                      >
                        {yesNoOptions.map((option) => (
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
                    <Typography variant="h5">Parking</Typography>
                    <FormControl fullWidth>
                      <Select
                        labelId="work-status-label"
                        id="work-status"
                        value={formik.values.parking}
                        onChange={(e) => {
                          formik.setFieldValue("parking", e.target.value);
                        }}
                      >
                        {yesNoOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {t(option.name)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    I’m accepting (you can choose many)
                  </Typography>
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

export default SearchLandlord;
