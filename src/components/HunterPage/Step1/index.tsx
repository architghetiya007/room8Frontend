import { Box, Grid, OutlinedInput, Slider, Typography } from "@mui/material";
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
    .nullable(),
  whenYouWouldLikeMoveIn: Yup.number()
    .nullable()
    .typeError("Invalid timestamp for move-in date"),
  preferredLengthToStay: Yup.string(),
  address: addressSchema,
  rangeFromCoordinate: Yup.number()
    .min(0, "Range must be non-negative")
    .nullable(),
  minimumPropertySize: Yup.number()
    .min(0, "Minimum property size must be non-negative")
    .nullable(),
  minimumNumberOfTenants: Yup.string(),
  roomAmount: Yup.string(),
  bathroomAmount: Yup.string(),
  parking: Yup.string(),
  furnished: Yup.string(),
  kitchen: Yup.string(),
  balcony: Yup.string(),
  maximumNumberOfpeople: Yup.number()
    .min(0, "Range must be non-negative")
    .nullable(),
  minimumRoomSize: Yup.number().min(0, "Range must be non-negative").nullable(),
  furnishedRoom: Yup.string(),
  privateBathroom: Yup.string(),
  balconyInRoom: Yup.string(),
});
interface Step1Props {
  updateTabIndex?: Function;
}
const Step1: React.FC<Step1Props> = () => {
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
    bathroomsAmount,
    propertyTypes,
    roomsAmount,
    tenants,
    commanPreferenceOptions,
    kitchenOptions,
    maximumNumberOfpeopleOptions,
    yesNoOptions,
    parkingOptions,
  } = useHunterData();

  const formik = useFormik({
    initialValues: {
      accommodation: "ENTIREROOM",
      typeOfProperty: "FLAT",
      acceptableRentRange: [300, 600],
      maximumDeposit: "",
      whenYouWouldLikeMoveIn: null,
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

      rangeFromCoordinate: 3,
      minimumPropertySize: "",
      minimumNumberOfTenants: "02",
      roomAmount: "02+",
      bathroomAmount: "01",
      parking: "DEDICATED",
      furnished: "NO_PREFERENCE",
      kitchen: "NO_PREFERENCE",
      balcony: "NO_PREFERENCE",
      maximumNumberOfpeople: "01",
      minimumRoomSize: "",
      furnishedRoom: "NO_PREFERENCE",
      privateBathroom: "YES",
      balconyInRoom: "NO_PREFERENCE",
    },
    validationSchema: hunterSchema,
    onSubmit: (values: any) => {
      if (!formik.values.address.formattedAddress) {
        showSnackBar({ message: t("messages.address") });
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
              window.scrollTo({top: 0, behavior: 'smooth'})
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

  const getAdvertisementAPI = () => {
    getAdvertisementMutation.mutate(params?.id ?? "", {
      onSuccess: (data) => {
        setAdvertisementData(data?.data);
        formik.setValues({
          ...formik.values,
          ...data!.data.hunterData,
        });
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

  return (
    <Box component={"form"}>
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
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("accommodation", e);
            }}
            selectionOption={formik.values.accommodation}
            options={accommodation}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">{t("typeOfPropertyQuestion")}</Typography>
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
          <Typography variant="h5">
            {t("acceptableRentRangeQuestion")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Slider
            getAriaLabel={() => "Temperature range"}
            min={0}
            max={1000}
            valueLabelDisplay="auto"
            value={formik.values.acceptableRentRange}
            onChange={(_, newValue) => {
              formik.setFieldValue("acceptableRentRange", newValue);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">{t("maximumDepositQuestion")}</Typography>
        </Grid>

        <Grid item xs={12}>
          <OutlinedInput
            fullWidth
            placeholder="No Preferences"
            value={formik.values.maximumDeposit}
            onChange={(e) =>
              formik.setFieldValue("maximumDeposit", e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5">
            {t("whenYouWouldLikeMoveInQuestion")}?
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            gap={1}
          >
            <Typography variant="h5">{t("availableNow")}</Typography>
            <IOSSwitch
              checked={formik.values.whenYouWouldLikeMoveIn === null}
              onChange={(e) => {
                const value = e.target.checked ? null : Date.now(); // Assuming timestamp
                formik.setFieldValue("whenYouWouldLikeMoveIn", value);
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Date"
                value={formik.values.whenYouWouldLikeMoveIn}
                onChange={(newValue) => {
                  formik.setFieldValue("whenYouWouldLikeMoveIn", newValue);
                }}
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
          <GoogleMapsAutocomplete
            onClickPlaceDetails={(e) => {
              formik.setFieldValue("address", e);
            }}
            selectedAddress={formik.values.address?.formattedAddress ?? ""}
          />
        </Grid>
        <Grid item xs={12}>
          <GoogleMaps
            {...(formik.values?.address?.coordinates && {
              lat: formik.values.address.coordinates[1],
              lng: formik.values.address.coordinates[0],
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">
            {t("rangeFromCoordinateQuestion")}
          </Typography>
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
          <Typography variant="h5">
            {t("minimumPropertySizeQuestion")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <OutlinedInput
            value={formik.values.minimumPropertySize}
            onChange={(e) =>
              formik.setFieldValue("minimumPropertySize", e.target.value)
            }
            fullWidth
            placeholder="100"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">
            {t("minimumNumberOfTenantsQuestion")}
          </Typography>
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
          <Typography variant="h5">{t("roomAmountQuestion")}</Typography>
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
          <Typography variant="h5">{t("bathroomAmountQuestion")}</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("bathroomAmount", e);
            }}
            selectionOption={formik.values.bathroomAmount}
            options={bathroomsAmount}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">{t("parkingQuestion")}</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("parking", e);
            }}
            selectionOption={formik.values.parking}
            options={parkingOptions}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">{t("furnishedQuestion")}</Typography>
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
          <Typography variant="h5">{t("kitchenQuestion")}</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("kitchen", e);
            }}
            selectionOption={formik.values.kitchen}
            options={kitchenOptions}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">{t("balconyQuestion")}</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("balcony", e);
            }}
            selectionOption={formik.values.balcony}
            options={commanPreferenceOptions}
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
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("maximumNumberOfpeople", e);
            }}
            selectionOption={formik.values.maximumNumberOfpeople}
            options={maximumNumberOfpeopleOptions}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">{t("minimumRoomSizeQuestion")}</Typography>
        </Grid>
        <Grid item xs={12}>
          <OutlinedInput
            value={formik.values.minimumRoomSize}
            onChange={(e) =>
              formik.setFieldValue("minimumRoomSize", e.target.value)
            }
            fullWidth
            placeholder="100"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">{t("furnishedRoomQuestion")}</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("furnishedRoom", e);
            }}
            selectionOption={formik.values.furnishedRoom}
            options={commanPreferenceOptions}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">{t("privateBathroomQuestion")}</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            options={yesNoOptions}
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("privateBathroom", e);
            }}
            selectionOption={formik.values.privateBathroom}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">{t("balconyInRoomQuestion")}</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            options={commanPreferenceOptions}
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("balconyInRoom", e);
            }}
            selectionOption={formik.values.balconyInRoom}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <OutlinedButton type="button" onClick={() => navigate("/")}>
            {t("CANCEL_BUTTON_TEXT")}
          </OutlinedButton>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomLoadingButton
            loading={
              createAdvertisementMutation.isPending ||
              updateAdvertisementMutation.isPending
            }
            sx={{ width: "100%" }}
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
