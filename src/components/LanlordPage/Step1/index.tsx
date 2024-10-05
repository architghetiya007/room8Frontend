import { Box, Grid, OutlinedInput, Stack, Typography } from "@mui/material";
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

const addressSchema = Yup.object().shape({
  streetNumber: Yup.string().nullable(), // Corresponds to streetNumber in interface
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
  roomsAmount: Yup.string().required("Rooms amount is required"),
  floor: Yup.number().required("Floor is required").min(0),
  numberOfFloor: Yup.number(),
  liftInBuilding: Yup.string().required("Lift in building is required"),
  IsApartmentFurnished: Yup.string().required(
    "Is apartment furnished is required"
  ),
  kitchen: Yup.string().required("Kitchen type is required"),
  parking: Yup.string().required("Parking type is required"),
  balconyInApartment: Yup.string().required("Balcony in apartment is required"),
});
interface Step1Props {
  updateTabIndex: Function;
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
    propertyOfferOptions,
    propertyTypes,
    yesNoOptions,
    howmanyPeopleLive,
    IsApartmentFurnished,
    kitchenOptions,
    parkingOptions,
    roomsAmount,
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
      propertySize: 0,
      roomsAmount: "01",
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
      if (!formik.values.address.formattedAddress) {
        showSnackBar({ message: t("messages.address") });
        return;
      }
      const body = {
        advertiseType: AdvertisementType.LANDLORD,
        landlordData: { ...advertisementData?.landlordData,...values },
      };
      if (params.id) {
        updateAdvertisementMutation.mutate(
          { advertisementId: params.id ?? "", data: body },
          {
            onSuccess: (data) => {
              showSnackBar({ message: data!.message });
              navigate(`/landlord/2/${data?.data._id}`);
            },
            onError: (error: Error) => {
              showSnackBar({ message: error.message, variant: "error" });
            },
          }
        );
      } else {
        createAdvertisementMutation.mutate(body, {
          onSuccess: (data) => {
            showSnackBar({ message: data!.message });
            navigate(`/landlord/2/${data?.data._id}`);
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
          // ...data!.data.landlordData,
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
          <Typography variant="h5">
            What type of property do you offer?
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
          <Typography variant="h5">Type of the property</Typography>
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
          <Typography variant="h5">Address of the place</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            Don't be afraid - The exact address will be hidden. People will only
            see approximate location
          </Typography>
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
          <Typography variant="h5"> Tell us more about your place</Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ borderBottom: "1px solid black" }}></Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Do you live here?</Typography>
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
          <Typography variant="h5">Does the owner live here?</Typography>
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
          <Typography variant="h5">
            How many people live at this PROPERTY? (including you and new
            person)
          </Typography>
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
          <Typography variant="h5">Property Size</Typography>
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
          <Typography variant="h5">Rooms Amount</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            options={roomsAmount}
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("roomsAmount", e);
            }}
            selectionOption={formik.values.roomsAmount}
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
          <Typography variant="h5">Lift in the building?</Typography>
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
          <Typography variant="h5">Is the apartment furnished?</Typography>
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
          <Typography variant="h5">Kitchen</Typography>
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
          <Typography variant="h5">Parking</Typography>
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
          <Typography variant="h5">Balcony in the apartment?</Typography>
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
            loading={
              createAdvertisementMutation.isPending ||
              updateAdvertisementMutation.isPending
            }
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
