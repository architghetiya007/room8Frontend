import {
  Box,
  FormHelperText,
  Grid,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { AdvertisementData } from "../../../types/advertisement";
import { eventEmitter } from "../../../utils/Comman/eventEmitter";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import CommanTypography from "../../comman/CommonTypography";

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
  propertyOffer: Yup.string().required("Property offer is required"),
  typeofProperty: Yup.string().required("Type of property is required"),
  address: addressSchema,
  doYouLiveHere: Yup.string().when("propertyOffer", {
    is: (value: string) => value !== "WHOLEPROPERTY",
    then: (schema) => schema.required("Do you live here is required"),
    otherwise: (schema) => schema.nullable(),
  }),
  ownerLiveHere: Yup.string().when("propertyOffer", {
    is: (value: string) => value !== "WHOLEPROPERTY",
    then: (schema) => schema.required("Owner live here is required"),
    otherwise: (schema) => schema.nullable(),
  }),
  howmanyPeopleLive: Yup.string().when("propertyOffer", {
    is: (value: string) => value !== "WHOLEPROPERTY",
    then: (schema) => schema.required("How many people live is required"),
    otherwise: (schema) => schema.nullable(),
  }),
  propertySize: Yup.number()
    .min(1, "Proerty Size must be non-negative")
    .max(100, "Proerty Size should be 1000")
    .required("Proerty Size is required"),
  roomsAmount: Yup.string().required("Rooms amount is required"),
  floor: Yup.number().when("typeofProperty", {
    is: (value: string) => value !== "HOUSE",
    then: (schema) =>
      schema
        .min(0, "Floor must be non-negative")
        .max(100, "Floor should be 100")
        .required("Floor Required"),
    otherwise: (schema) => schema.nullable(),
  }),
  numberOfFloor: Yup.number().when("typeofProperty", {
    is: (value: string) => value !== "HOUSE",
    then: (schema) =>
      schema
        .min(0, "Number of floor must be non-negative")
        .max(100, "Number of floor should be 100")
        .required("Number of Floor Required"),
    otherwise: (schema) => schema.nullable(),
  }),
  liftInBuilding: Yup.number().when("typeofProperty", {
    is: (value: string) => value !== "HOUSE",
    then: (schema) => schema.required("Minimum room size is required"),
    otherwise: (schema) => schema.nullable(),
  }),
  IsApartmentFurnished: Yup.string().required(
    "Is apartment furnished is required"
  ),
  kitchen: Yup.string().required("Kitchen type is required"),
  parking: Yup.string().required("Parking type is required"),
  balconyInApartment: Yup.string().required("Balcony in apartment is required"),
});

interface Address {
  streetNumber?: string;
  streetName?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  addressLine?: string;
  formattedAddress?: string;
  coordinate?: number[]; // Assuming coordinate are represented as an array of numbers (latitude, longitude)
}

interface PropertyFormValues {
  propertyOffer: string;
  typeofProperty: string;
  address?: Address;
  doYouLiveHere: string;
  ownerLiveHere: string;
  howmanyPeopleLive: string; // You may want to use `number` if this is always a number
  propertySize: number; // Assuming property size is a number
  roomsAmount: string; // You may want to use `number` if this is always a number
  floor: string; // You may want to use `number` if this is always a number
  numberOfFloor: string; // You may want to use `number` if this is always a number
  liftInBuilding: string;
  IsApartmentFurnished: string;
  kitchen: string;
  parking: string;
  balconyInApartment: string;
}
interface Step1Props {
  updateTabIndex: Function;
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
    propertyOfferOptions,
    propertyTypes,
    yesNoOptions,
    howmanyPeopleLive,
    IsApartmentFurnished,
    kitchenOptions,
    parkingOptions,
    roomsAmount,
  } = useLandlord();
  const formik = useFormik<PropertyFormValues>({
    initialValues: {
      propertyOffer: "",
      typeofProperty: "",
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
      doYouLiveHere: "",
      ownerLiveHere: "",
      howmanyPeopleLive: "",
      propertySize: 1,
      roomsAmount: "",
      floor: "",
      numberOfFloor: "",
      liftInBuilding: "",
      IsApartmentFurnished: "",
      kitchen: "",
      parking: "",
      balconyInApartment: "",
    },
    validationSchema: landlordSchema,
    onSubmit: (values) => {
      if (!formik.values!.address!.formattedAddress) {
        showSnackBar({ message: t("messages.address") });
        return;
      }
      if (!userSlice.user) {
        eventEmitter.emit("Header", "openLoginDialog");
        return;
      }
      const body = {
        advertiseType: AdvertisementType.LANDLORD,
        landlordData: { ...advertisementData?.landlordData, ...values },
      };
      if (params.id) {
        updateAdvertisementMutation.mutate(
          { advertisementId: params.id ?? "", data: body },
          {
            onSuccess: (data) => {
              // showSnackBar({ message: data!.message });
              navigate(`/landlord/2/${data?.data._id}`);
              window.scrollTo({ top: 0, behavior: "smooth" });
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
            navigate(`/landlord/2/${data?.data._id}`);
            window.scrollTo({ top: 0, behavior: "smooth" });
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
        setAdvertisementData(data!.data);
        formik.setValues({
          ...formik.values,
          ...data!.data.landlordData,
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

  return (
    <Box component={"form"} onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} mt={2} mb={2}>
        <Grid item xs={12}>
          <Typography
            sx={{ fontSize: "22px", fontWeight: "600", color: "#6D778A" }}
          >
            Step 1/3
          </Typography>
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
            {t("landlordQ.rentOutOfyourPlace")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ borderBottom: "1px solid black" }}></Box>
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.whatTypefPropertyOffer")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("propertyOffer", e);
            }}
            selectionOption={formik.values.propertyOffer}
            options={propertyOfferOptions}
          />
          {formik.errors.propertyOffer && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.propertyOffer.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.typeOfProperty")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("typeofProperty", e);
            }}
            selectionOption={formik.values.typeofProperty}
            options={propertyTypes}
          />
          {formik.errors.typeofProperty && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.typeofProperty.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.addressofPlace")} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{ fontWeight: "500", fontSize: "20px", color: "#6D778A" }}
          >
            {t("landlordQ.addressSubTitle")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <GoogleMapsAutocomplete
            onClickPlaceDetails={(e) => {
              formik.setFieldValue("address", e);
            }}
            selectedAddress={formik.values.address?.formattedAddress ?? ""}
          />
        </Grid>
        {formik.values.propertyOffer !== "WHOLEPROPERTY" && (
          <>
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
                  fontWeight: "700",
                  fontSize: "45px",
                }}
              >
                {t("landlordQ.tellmeAboutYourProperty")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ borderBottom: "1px solid black" }}></Box>
            </Grid>
            <Grid item xs={12}>
              <CommanTypography title={t("landlordQ.doYouLeaveHere")} />
            </Grid>
            <Grid item xs={12}>
              <CustomButtonGroup
                options={yesNoOptions}
                optionClick={(e: string[] | string) => {
                  formik.setFieldValue("doYouLiveHere", e);
                }}
                selectionOption={formik.values.doYouLiveHere}
              />
              {formik.errors.doYouLiveHere && (
                <FormHelperText sx={{ color: "red" }}>
                  {formik.errors.doYouLiveHere.toString()}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <CommanTypography title={t("landlordQ.liveOwenerHere")} />
            </Grid>
            <Grid item xs={12}>
              <CustomButtonGroup
                options={yesNoOptions}
                optionClick={(e: string[] | string) => {
                  formik.setFieldValue("ownerLiveHere", e);
                }}
                selectionOption={formik.values.ownerLiveHere}
              />
              {formik.errors.ownerLiveHere && (
                <FormHelperText sx={{ color: "red" }}>
                  {formik.errors.ownerLiveHere.toString()}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <CommanTypography
                title={t("landlordQ.howManyPeopleLiveInthisProperty")}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomButtonGroup
                options={howmanyPeopleLive}
                optionClick={(e: string[] | string) => {
                  formik.setFieldValue("howmanyPeopleLive", e);
                }}
                selectionOption={formik.values.howmanyPeopleLive}
              />
              {formik.errors.howmanyPeopleLive && (
                <FormHelperText sx={{ color: "red" }}>
                  {formik.errors.howmanyPeopleLive.toString()}
                </FormHelperText>
              )}
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <Box sx={{ borderBottom: "1px solid black" }}></Box>
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.propertySize") + "(m²)"} />
        </Grid>
        <Grid item xs={12}>
          <OutlinedInput
            value={formik.values.propertySize}
            onChange={(e) =>
              formik.setFieldValue("propertySize", e.target.value)
            }
            fullWidth
            placeholder="100"
            type="number"
            inputProps={{
              min: "0",
              max: "1000",
            }}
            error={formik.touched.propertySize && !!formik.errors.propertySize}
          />
          {formik.errors.propertySize && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.propertySize.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.roomsAmount")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            options={roomsAmount}
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("roomsAmount", e);
            }}
            selectionOption={formik.values.roomsAmount}
          />
          {formik.errors.roomsAmount && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.roomsAmount.toString()}
            </FormHelperText>
          )}
        </Grid>
        {formik.values.typeofProperty !== "HOUSE" && (
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <Stack flexDirection={"column"} spacing={2}>
                  <CommanTypography title={t("landlordQ.floor")} />
                  <OutlinedInput
                    value={formik.values.floor}
                    onChange={(e) =>
                      formik.setFieldValue("floor", e.target.value)
                    }
                    fullWidth
                    placeholder="100"
                    type="number"
                    inputProps={{
                      min: 0,
                      max: 100,
                    }}
                    error={formik.touched.floor && !!formik.errors.floor}
                  />
                  {formik.errors.floor && (
                    <FormHelperText sx={{ color: "red" }}>
                      {formik.errors.floor.toString()}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack flexDirection={"column"} spacing={2}>
                  <CommanTypography
                    title={t("landlordQ.numberOFFloorsintheBuilding")}
                  />
                  <OutlinedInput
                    value={formik.values.numberOfFloor}
                    onChange={(e) =>
                      formik.setFieldValue("numberOfFloor", e.target.value)
                    }
                    fullWidth
                    placeholder="100"
                    type="number"
                    inputProps={{
                      min: 0,
                      max: 100,
                    }}
                    error={
                      formik.touched.numberOfFloor &&
                      !!formik.errors.numberOfFloor
                    }
                  />
                  {formik.errors.numberOfFloor && (
                    <FormHelperText sx={{ color: "red" }}>
                      {formik.errors.numberOfFloor.toString()}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        )}
        {formik.values.typeofProperty !== "HOUSE" && (
          <>
            <Grid item xs={12}>
              <CommanTypography title={t("landlordQ.liftinthebuilding")} />
            </Grid>
            <Grid item xs={12}>
              <CustomButtonGroup
                options={yesNoOptions}
                optionClick={(e: string[] | string) => {
                  formik.setFieldValue("liftInBuilding", e);
                }}
                selectionOption={formik.values.liftInBuilding}
              />
              {formik.errors.liftInBuilding && (
                <FormHelperText sx={{ color: "red" }}>
                  {formik.errors.liftInBuilding.toString()}
                </FormHelperText>
              )}
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.IstheApartmentFurnished")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            options={IsApartmentFurnished}
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("IsApartmentFurnished", e);
            }}
            selectionOption={formik.values.IsApartmentFurnished}
          />
          {formik.errors.IsApartmentFurnished && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.IsApartmentFurnished.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.kitchen")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            options={kitchenOptions}
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("kitchen", e);
            }}
            selectionOption={formik.values.kitchen}
          />
          {formik.errors.kitchen && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.kitchen.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.parking")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            options={parkingOptions}
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("parking", e);
            }}
            selectionOption={formik.values.parking}
          />
          {formik.errors.parking && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.parking.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.balconyIntheApartment")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            options={yesNoOptions}
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("balconyInApartment", e);
            }}
            selectionOption={formik.values.balconyInApartment}
          />
          {formik.errors.balconyInApartment && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.balconyInApartment.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ borderBottom: "1px solid black" }}></Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <OutlinedButton type="button" onClick={() => navigate("/")}>
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
            sx={{ width: "100%" }}
            onClick={() => formik.handleSubmit()}
          >
            {t("NEXT")}
          </CustomLoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step1;
