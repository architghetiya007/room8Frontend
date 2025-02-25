import {
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
import React, { useEffect, useState } from "react";
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
import { AdvertisementType } from "../../../utils/advertisement";
import GoogleMapsAutocomplete from "../../comman/GoogleMapsAutoComplete";
import { useNavigate, useParams } from "react-router-dom";
import { AdvertisementData } from "../../../types/advertisement";
import CommanTypography from "../../comman/CommonTypography";
import dayjs from "dayjs";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { eventEmitter } from "../../../utils/Comman/eventEmitter";
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
  accommodation: Yup.string().required("Accommodation is required"),
  typeOfProperty: Yup.string().required("TypeOfProperty is required"),
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
  preferredLengthToStay: Yup.string().required(
    "PreferredLengthToStay is required"
  ),
  address: addressSchema,
  rangeFromCoordinate: Yup.number()
    .min(0, "Range must be non-negative")
    .nullable(),
  minimumPropertySize: Yup.number()
    .min(0, "Minimum property size must be non-negative")
    .max(1000, "Minimum property size should be 1000")
    .required("Minimum property size is required"),
  minimumNumberOfTenants: Yup.string().required(
    "MinimumNumberOfTenants is required"
  ),
  roomAmount: Yup.string().required("RoomAmount is required"),
  bathroomAmount: Yup.string(),
  parking: Yup.array()
    .of(Yup.string())
    .min(1, "At least one parking option is required")
    .required("Parking is required"),
  furnished: Yup.string().required("Furnished is required"),
  kitchen: Yup.string().required("Kitchen is required"),
  balcony: Yup.string().required("Balcony is required"),
  maximumNumberOfpeople: Yup.string().when("accommodation", {
    is: (value: string) => value !== "WHOLEPROPERTY",
    then: (schema) =>
      schema.defined().required("MaximumNumberOfpeople is required"),
  }),
  minimumRoomSize: Yup.number().when("accommodation", {
    is: (value: string) => value !== "WHOLEPROPERTY",
    then: (schema) =>
      schema
        .min(0, "Range must be non-negative")
        .max(100, "Maximum room size should be 100")
        .required("Minimum room size is required"),
    otherwise: (schema) => schema.nullable(),
  }),
  furnishedRoom: Yup.string().when("accommodation", {
    is: (value: string) => value !== "WHOLEPROPERTY",
    then: (schema) => schema.defined().required("FurnishedRoom is required"),
  }),
  privateBathroom: Yup.string().when("accommodation", {
    is: (value: string) => value !== "WHOLEPROPERTY",
    then: (schema) => schema.defined().required("PrivateBathroom is required"),
  }),
  balconyInRoom: Yup.string().when("accommodation", {
    is: (value: string) => value !== "WHOLEPROPERTY",
    then: (schema) => schema.defined().required("BalconyInRoom is required"),
  }),
});
interface Step1Props {
  updateTabIndex?: Function;
}
const Step1: React.FC<Step1Props> = () => {
  const userSlice = useSelector((state: RootState) => state.user);
  const [advertisementData, setAdvertisementData] =
    useState<AdvertisementData>();
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useCommonTranslation();
  const {
    createAdvertisementMutation,
    updateAdvertisementMutation,
    getAdvertisementMutation,
  } = useAdvertisementMutations();
  const { showSnackBar } = useNotification();
  const {
    accommodation,
    propertyTypes,
    roomsAmount,
    tenants,
    commanPreferenceOptions,
    kitchenOptions,
    maximumNumberOfpeopleOptions,
    yesNoOptions,
    parkingOptions,
    duration,
  } = useHunterData();

  const formik = useFormik({
    initialValues: {
      accommodation: "",
      typeOfProperty: "",
      acceptableRentRange: [3000, 6000],
      maximumDeposit: "",
      whenYouWouldLikeMoveIn: null,
      isAvailableNow: true,
      preferredLengthToStay: "",
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
      minimumPropertySize: "",
      minimumNumberOfTenants: "",
      roomAmount: "",
      bathroomAmount: "",
      parking: [],
      furnished: "",
      kitchen: "",
      balcony: "",
      maximumNumberOfpeople: "",
      minimumRoomSize: "",
      furnishedRoom: "",
      privateBathroom: "",
      balconyInRoom: "",
    },
    validationSchema: hunterSchema,
    onSubmit: (values: any) => {
      if (!formik.values.address.formattedAddress) {
        showSnackBar({ message: t("messages.address") });
        return;
      }
      if (!userSlice.user) {
        eventEmitter.emit("Header", "openLoginDialog");
        return;
      }
      const body = {
        advertiseType: AdvertisementType.HUNTER,
        hunterData: { ...advertisementData?.hunterData, ...values },
      };
      if (params.id) {
        updateAdvertisementMutation.mutate(
          { advertisementId: params.id ?? "", data: body },
          {
            onSuccess: (data) => {
              // showSnackBar({ message: data!.message });
              navigate(`/hunter/2/${data?.data._id}`);
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 300);
            },
            onError: (error: Error) => {
              showSnackBar({ message: error.message, variant: "error" });
            },
          }
        );
      } else {
        createAdvertisementMutation.mutate(body, {
          onSuccess: (data) => {
            // showSnackBar({ message: data!.message });
            navigate(`/hunter/2/${data?.data._id}`);
          },
          onError: (error: Error) => {
            showSnackBar({ message: error.message, variant: "error" });
          },
        });
      }
    },
  });

  console.log(formik.errors);

  const getAdvertisementAPI = () => {
    getAdvertisementMutation.mutate(params?.id ?? "", {
      onSuccess: (data) => {
        setAdvertisementData(data?.data);
        formik.setValues({
          ...formik.values,
          ...data!.data.hunterData,
        });
        setTimeout(() => {
          formik.setErrors({});
        }, 0);
      },
      onError: (error: Error) => {
        showSnackBar({ message: error.message, variant: "error" });
        navigate("/");
      },
    });
  };

  useEffect(() => {
    if (params.id) {
      getAdvertisementAPI();
    }
  }, [params.id]);

  console.log(formik.errors);

  return (
    <Box component={"form"}>
      <Grid container spacing={2} mt={2} mb={8}>
        <Grid item xs={12}>
          <Typography
            sx={{ fontSize: "22px", fontWeight: "600", color: "#6D778A" }}
          >
            Step 1/2
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            sx={{
              background:
                "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "700",
              fontSize: "45px",
            }}
          >
            {t("hunterStep1Title")}
          </Typography>
        </Grid>
        {/* <Grid item xs={12}>
          <Box sx={{ borderBottom: "1px solid black" }}></Box>
        </Grid> */}
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
          {formik.errors.accommodation && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.accommodation.toString()}
            </FormHelperText>
          )}
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
          {formik.errors.typeOfProperty && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.typeOfProperty.toString()}
            </FormHelperText>
          )}
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
        <Grid item xs={12}>
          <CommanTypography title={t("maximumDepositQuestion")} />
        </Grid>

        <Grid item xs={12}>
          <OutlinedInput
            fullWidth
            inputProps={{
              min: "0",
              max: "50000",
              step: 100,
            }}
            placeholder="No Preferences"
            value={formik.values.maximumDeposit}
            onChange={(e) =>
              formik.setFieldValue("maximumDeposit", e.target.value)
            }
            type="number"
            error={
              formik.touched.maximumDeposit && !!formik.errors.maximumDeposit
            }
          />
          {formik.errors.maximumDeposit && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.maximumDeposit.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <CommanTypography title={t("whenYouWouldLikeMoveInQuestion")} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            gap={1}
          >
            <CommanTypography title={t("availableNow")} />
            <IOSSwitch
              checked={formik.values.isAvailableNow}
              onChange={(e) => {
                formik.setFieldValue("isAvailableNow", e.target.checked);
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                minDate={dayjs(new Date())}
                maxDate={dayjs(new Date()).add(1, "year")}
                sx={{ width: "100%" }}
                format="DD/MM/YYYY"
                label="Date"
                value={
                  formik.values.whenYouWouldLikeMoveIn
                    ? dayjs(formik.values.whenYouWouldLikeMoveIn)
                    : null
                }
                onChange={(newValue) => {
                  formik.setFieldValue(
                    "whenYouWouldLikeMoveIn",
                    newValue?.valueOf(),
                    true
                  );
                  formik.setFieldValue("isAvailableNow", false);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          {formik.errors.whenYouWouldLikeMoveIn && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.whenYouWouldLikeMoveIn.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("preferredLengthToStay")} />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Select
              displayEmpty
              placeholder="Select"
              labelId="work-status-label"
              id="work-status"
              value={formik.values.preferredLengthToStay}
              onChange={(e) => {
                formik.setFieldValue(
                  "preferredLengthToStay",
                  e.target.value,
                  true
                );
              }}
            >
              <MenuItem value="">Select</MenuItem>
              {duration.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {t(option.name)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {formik.errors.preferredLengthToStay && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.preferredLengthToStay.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <CommanTypography title={t("addressQuestion")} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">{t("addressSubTitle")}</Typography>
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
          <GoogleMaps
            {...(formik.values?.address?.coordinate && {
              lat: formik.values.address.coordinate[1],
              lng: formik.values.address.coordinate[0],
            })}
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
          <Typography
            sx={{
              background:
                "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "700",
              fontSize: "45px",
            }}
          >
            {t("describeYourPlace")}
          </Typography>
        </Grid>
        {/* <Grid item xs={12}>
          <Box sx={{ borderBottom: "1px solid black" }}></Box>
        </Grid> */}
        <Grid item xs={12}>
          <CommanTypography title={t("minimumPropertySizeQuestion")} />
        </Grid>
        <Grid item xs={12}>
          <OutlinedInput
            value={formik.values.minimumPropertySize}
            onChange={(e) =>
              formik.setFieldValue("minimumPropertySize", e.target.value)
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
          <CommanTypography title={t("minimumNumberOfTenantsQuestion")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("minimumNumberOfTenants", e);
            }}
            selectionOption={formik.values.minimumNumberOfTenants}
            options={tenants}
          />
          {formik.errors.minimumNumberOfTenants && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.minimumNumberOfTenants.toString()}
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
          {formik.errors.roomAmount && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.roomAmount.toString()}
            </FormHelperText>
          )}
        </Grid>
        {/* <Grid item xs={12}>
          <CommanTypography title={t("bathroomAmountQuestion")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("bathroomAmount", e);
            }}
            selectionOption={formik.values.bathroomAmount}
            options={bathroomsAmount}
          />
        </Grid> */}
        <Grid item xs={12}>
          <CommanTypography title={t("parkingQuestion")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            multiSelect
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("parking", e);
            }}
            selectionOption={formik.values.parking}
            options={parkingOptions}
          />
          {formik.errors.parking && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.parking.toString()}
            </FormHelperText>
          )}
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
          {formik.errors.furnished && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.furnished.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("kitchenQuestion")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("kitchen", e);
            }}
            selectionOption={formik.values.kitchen}
            options={kitchenOptions}
          />
          {formik.errors.kitchen && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.kitchen.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("balconyQuestion")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("balcony", e);
            }}
            selectionOption={formik.values.balcony}
            options={commanPreferenceOptions}
          />
          {formik.errors.balcony && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.balcony.toString()}
            </FormHelperText>
          )}
        </Grid>
        {formik.values.accommodation !== "WHOLEPROPERTY" && (
          <>
            {/* <Grid item xs={12}>
              <Box sx={{ borderBottom: "1px solid black" }}></Box>
            </Grid> */}
            <Grid item xs={12}>
              <Typography
                sx={{
                  background:
                    "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "700",
                  fontSize: "45px",
                }}
              >
                {t("describeIdelRoom")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <CommanTypography title={t("maximumNumberOfpeopleQuestion")} />
            </Grid>
            <Grid item xs={12}>
              <CustomButtonGroup
                optionClick={(e: string[] | string) => {
                  formik.setFieldValue("maximumNumberOfpeople", e);
                }}
                selectionOption={formik.values.maximumNumberOfpeople}
                options={maximumNumberOfpeopleOptions}
              />
              {formik.errors.maximumNumberOfpeople && (
                <FormHelperText sx={{ color: "red" }}>
                  {formik.errors.maximumNumberOfpeople.toString()}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <CommanTypography title={t("minimumRoomSizeQuestion")} />
            </Grid>
            <Grid item xs={12}>
              <OutlinedInput
                value={formik.values.minimumRoomSize}
                onChange={(e) =>
                  formik.setFieldValue("minimumRoomSize", e.target.value)
                }
                inputProps={{
                  min: "0",
                  max: "100",
                }}
                type="number"
                fullWidth
                placeholder="100"
                error={
                  formik.touched.minimumRoomSize &&
                  !!formik.errors.minimumRoomSize
                }
              />
              {formik.errors.minimumRoomSize && (
                <FormHelperText sx={{ color: "red" }}>
                  {formik.errors.minimumRoomSize.toString()}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <CommanTypography title={t("furnishedRoomQuestion")} />
            </Grid>
            <Grid item xs={12}>
              <CustomButtonGroup
                optionClick={(e: string[] | string) => {
                  formik.setFieldValue("furnishedRoom", e);
                }}
                selectionOption={formik.values.furnishedRoom}
                options={commanPreferenceOptions}
              />
              {formik.errors.furnishedRoom && (
                <FormHelperText sx={{ color: "red" }}>
                  {formik.errors.furnishedRoom.toString()}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <CommanTypography title={t("privateBathroomQuestion")} />
            </Grid>
            <Grid item xs={12}>
              <CustomButtonGroup
                options={yesNoOptions}
                optionClick={(e: string[] | string) => {
                  formik.setFieldValue("privateBathroom", e);
                }}
                selectionOption={formik.values.privateBathroom}
              />
              {formik.errors.privateBathroom && (
                <FormHelperText sx={{ color: "red" }}>
                  {formik.errors.privateBathroom.toString()}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <CommanTypography title={t("balconyInRoomQuestion")} />
            </Grid>
            <Grid item xs={12}>
              <CustomButtonGroup
                options={commanPreferenceOptions}
                optionClick={(e: string[] | string) => {
                  formik.setFieldValue("balconyInRoom", e, true);
                }}
                selectionOption={formik.values.balconyInRoom}
              />
              {formik.errors.balconyInRoom && (
                <FormHelperText sx={{ color: "red" }}>
                  {formik.errors.balconyInRoom.toString()}
                </FormHelperText>
              )}
            </Grid>
          </>
        )}
        <Grid item xs={12} mb={2} mt={2}>
          <Box sx={{ borderBottom: "1px solid black" }}></Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <OutlinedButton
            sx={{ height: "72px" }}
            type="button"
            onClick={() => navigate("/")}
          >
            {t("CANCEL_BUTTON_TEXT")}
          </OutlinedButton>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomLoadingButton
            disabled={!formik.isValid}
            loading={
              createAdvertisementMutation.isPending ||
              updateAdvertisementMutation.isPending
            }
            sx={{ width: "100%", height: "72px" }}
            onClick={() => formik.handleSubmit()}
          >
            {t("NEXT_BUTTON_TEXT")}
          </CustomLoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step1;
