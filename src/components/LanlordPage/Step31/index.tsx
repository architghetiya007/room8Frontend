import {
  Avatar,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AdvertisementType } from "../../../utils/advertisement";
import useNotification from "../../../hooks/useNotification";
import useAdvertisementMutations from "../../../mutations/advertisement";
import CustomButtonGroup from "../../comman/CustomButtonGroup";
import useLandlord from "../../../hooks/useLandlord";
import { LoadingButton } from "@mui/lab";
import CustomLoadingButton from "../../comman/CustomLoadingButton";
import OutlinedButton from "../../comman/OutlinedButton";
import { useNavigate, useParams } from "react-router-dom";
import useCommonTranslation from "../../../hooks/useCommonTranslation";
import { AdvertisementData } from "../../../types/advertisement";
import useUserMutations from "../../../mutations/user";
import useHunterData from "../../../hooks/useHunter";
import CommanTypography from "../../comman/CommonTypography";
const landlordSchema = Yup.object().shape({
  profilePhoto: Yup.string(),
  genderOfCurrentTenants: Yup.string().required(
    "GenderOfCurrentTenants is required"
  ),
  currentTenantsName: Yup.string().required("CurrentTenantsName is required"),
  ageOfCurrentTenants: Yup.string().required("AgeOfCurrentTenants is required"),
  doChildrenLiveHere: Yup.string().required("DoChildrenLiveHere is required"),
  isPetLivingInApartment: Yup.string().required(
    "IsPetLivingInApartment is required"
  ),
  currentTenantsEmployment: Yup.string().required(
    "CurrentTenantsEmployment is required"
  ),
  tenantsSmoking: Yup.string().required("TenantsSmoking is required"),
  preferenceOfFutureTenants: Yup.array()
    .of(Yup.string().required("Preference of future tenant is required"))
    .min(1, "PreferenceOfFutureTenants is required"),
  ageRangeOfFutureRoommate: Yup.array().of(
    Yup.number().required("Age range of future roommate is required")
  ),
  acceptTenantWithChildren: Yup.string().required(
    "AcceptTenantWithChildren is required"
  ),
  tenantAcceptPets: Yup.string().required("TenantAcceptPets is required"),
  tenantAcceptSmoking: Yup.string().required("TenantAcceptSmoking is required"),
});

interface Step31Props {
  updateTabIndex: Function;
}
const Step31: React.FC<Step31Props> = () => {
  const [advertisementData, setAdvertisementData] =
    useState<AdvertisementData>();
  const params = useParams();
  const { t } = useCommonTranslation();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { uploadImageMutation } = useUserMutations();
  const { updateAdvertisementMutation, getAdvertisementMutation } =
    useAdvertisementMutations();
  const { showSnackBar } = useNotification();
  const {
    yesNoOptions,
    yesNoOutside,
    iamAcceptingOptions,
    commanPreferenceOptions,
    smokingOptions,
  } = useLandlord();
  const { typeOfEmployment } = useHunterData();
  const formik = useFormik({
    initialValues: {
      profilePhoto: "",
      genderOfCurrentTenants: "",
      currentTenantsName: "",
      ageOfCurrentTenants: "",
      doChildrenLiveHere: "",
      isPetLivingInApartment: "",
      currentTenantsEmployment: "",
      tenantsSmoking: "",
      preferenceOfFutureTenants: [],
      ageRangeOfFutureRoommate: [18, 35],
      acceptTenantWithChildren: "",
      tenantAcceptPets: "",
      tenantAcceptSmoking: "",
    },
    validationSchema: landlordSchema,
    onSubmit: async (values: any) => {
      if (selectedImage) {
        let formData = new FormData();
        formData.append("files", selectedImage);
        let response = await uploadImageMutation.mutateAsync(formData);
        if (response?.status === true) {
          values.profilePhoto = response.data[0];
        }
      } else {
        if (!advertisementData?.landlordData?.profilePhoto) {
          showSnackBar({ message: "Please select photo", variant: "error" });
          return;
        }
      }
      const body = {
        advertiseType: AdvertisementType.LANDLORD,
        landlordData: { ...advertisementData?.landlordData, ...values },
      };
      updateAdvertisementMutation.mutate(
        { advertisementId: params.id ?? "", data: body },
        {
          onSuccess: (data) => {
            // showSnackBar({ message: data!.message });
            navigate(`/landlord-preview/${data?.data._id}`);
            window.scrollTo({ top: 0, behavior: "smooth" });
          },
          onError: (error: Error) => {
            showSnackBar({ message: error.message, variant: "error" });
          },
        }
      );
    },
  });

  const getAdvertisementAPI = () => {
    getAdvertisementMutation.mutate(params?.id ?? "", {
      onSuccess: (data) => {
        setAdvertisementData(data?.data);
        formik.setValues({
          ...formik.values,
          ...data?.data?.landlordData,
          preferenceOfFutureTenants:
            data!.data?.landlordData!.preferenceOfFutureTenants!.length > 0
              ? data?.data?.landlordData?.preferenceOfFutureTenants
              : ["WOMAN"],
          ageRangeOfFutureRoommate:
            data!.data?.landlordData!.ageRangeOfFutureRoommate!.length > 0
              ? data?.data?.landlordData?.ageRangeOfFutureRoommate
              : [18, 35],
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
    getAdvertisementAPI();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file); // Set the selected file

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string); // Set the preview URL
      };

      reader.readAsDataURL(file); // Read the file as a data URL for preview
    }
  };

  const handleClick = () => {
    const fileInput = document.getElementById(
      "profile-image-input"
    ) as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <Box component={"form"}>
      <Grid container spacing={2} mt={2} mb={8}>
        <Grid item xs={12}>
          <Typography
            sx={{ fontSize: "22px", fontWeight: "600", color: "#6D778A" }}
          >
            Step 3/3
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
            {t("landlordQ.tellmeYourRef")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ borderBottom: "1px solid black" }}></Box>
        </Grid>
        <Grid item xs={12}>
          <Stack
            spacing={2}
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ border: "1px solid red", borderRadius: "8px", p: 4 }}
          >
            <CommanTypography title={t("landlordQ.photos12")} />
            <Typography
              sx={{ fontWeight: "500", fontSize: "20px", color: "#6D778A" }}
            >
              {t("landlordQ.photos123")}
            </Typography>
            <Avatar
              sx={{
                width: 80, // Set the width
                height: 80, // Set the height
              }}
              src={
                preview
                  ? preview
                  : advertisementData?.landlordData?.profilePhoto ?? ""
              }
            ></Avatar>
            <input
              type="file"
              id="profile-image-input"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }} // Hide file input
            />
            <LoadingButton
              onClick={handleClick}
              sx={{
                background:
                  "linear-gradient(to right, #4AB1F1, #566CEC, #D749AF, #FF7C51)",
                // width: "100px",
                px: 4,
                borderRadius: "50px",
                color: "white",
                textTransform: "none",
                letterSpacing: "1px",
                fontWeight: "600",
                fontSize: "24px",
              }}
              type="button"
            >
              {t("landlordQ.uploadPhotos2")}
            </LoadingButton>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.currentTenantInfo")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("genderOfCurrentTenants", e);
            }}
            selectionOption={formik.values.genderOfCurrentTenants}
            options={iamAcceptingOptions}
          />
          {formik.errors.genderOfCurrentTenants && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.genderOfCurrentTenants.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction={"column"} spacing={1}>
            <CommanTypography title={t("landlordQ.currentTenantName")} />
            <OutlinedInput
              value={formik.values.currentTenantsName}
              onChange={(e) =>
                formik.setFieldValue("currentTenantsName", e.target.value)
              }
              fullWidth
              placeholder="Your Name"
            />
            {formik.errors.currentTenantsName && (
              <FormHelperText sx={{ color: "red" }}>
                {formik.errors.currentTenantsName.toString()}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction={"column"} spacing={1}>
            <CommanTypography title={t("landlordQ.currentTenantAge")} />
            <OutlinedInput
              value={formik.values.ageOfCurrentTenants}
              onChange={(e) =>
                formik.setFieldValue("ageOfCurrentTenants", e.target.value)
              }
              fullWidth
              placeholder="Your age"
            />
            {formik.errors.ageOfCurrentTenants && (
              <FormHelperText sx={{ color: "red" }}>
                {formik.errors.ageOfCurrentTenants.toString()}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.childrenLiveHere")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("doChildrenLiveHere", e);
            }}
            selectionOption={formik.values.doChildrenLiveHere}
            options={yesNoOptions}
          />
          {formik.errors.doChildrenLiveHere && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.doChildrenLiveHere.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.petLivingApartment")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("isPetLivingInApartment", e);
            }}
            selectionOption={formik.values.isPetLivingInApartment}
            options={yesNoOptions}
          />
          {formik.errors.isPetLivingInApartment && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.isPetLivingInApartment.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.tenantEmployment")} />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Select
              displayEmpty
              labelId="work-status-label"
              id="work-status"
              value={formik.values.currentTenantsEmployment}
              onChange={(e) => {
                formik.setFieldValue(
                  "currentTenantsEmployment",
                  e.target.value
                );
              }}
            >
              <MenuItem value="">Select</MenuItem>
              {typeOfEmployment.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {t(option.name)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {formik.errors.currentTenantsEmployment && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.currentTenantsEmployment.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.tenantSmoking")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("tenantsSmoking", e);
            }}
            selectionOption={formik.values.tenantsSmoking}
            options={yesNoOutside}
          />
          {formik.errors.tenantsSmoking && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.tenantsSmoking.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{
              background:
                "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "45px",
              fontWeight: "700",
            }}
          >
            {t("landlordQ.yourFlateMatePref11")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ borderBottom: "1px solid black" }}></Box>
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.AcceptPref")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("preferenceOfFutureTenants", e);
            }}
            multiSelect={true}
            selectionOption={formik.values.preferenceOfFutureTenants}
            options={iamAcceptingOptions}
          />
          {formik.errors.preferenceOfFutureTenants && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.preferenceOfFutureTenants.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.futureRoommate")} />
        </Grid>
        <Grid item xs={12}>
          <Slider
            aria-label="Restricted values"
            value={formik.values.ageRangeOfFutureRoommate}
            onChange={(_, newValue) => {
              formik.setFieldValue("ageRangeOfFutureRoommate", newValue);
            }}
            step={1}
            valueLabelDisplay="auto"
            max={100}
            min={0}
          />
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.AcceptTenantChildren")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("acceptTenantWithChildren", e);
            }}
            selectionOption={formik.values.acceptTenantWithChildren}
            options={commanPreferenceOptions}
          />
          {formik.errors.acceptTenantWithChildren && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.acceptTenantWithChildren.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.acceptPets1")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("tenantAcceptPets", e);
            }}
            selectionOption={formik.values.tenantAcceptPets}
            options={commanPreferenceOptions}
          />
          {formik.errors.tenantAcceptPets && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.tenantAcceptPets.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.acceptSmoking1")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("tenantAcceptSmoking", e);
            }}
            selectionOption={formik.values.tenantAcceptSmoking}
            options={smokingOptions}
          />
          {formik.errors.tenantAcceptSmoking && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.tenantAcceptSmoking.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <OutlinedButton
            type="button"
            onClick={() => navigate(`/landlord/2/${advertisementData?._id}`)}
          >
            {t("BACK_BUTTON_TEXT")}
          </OutlinedButton>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomLoadingButton
            sx={{ width: "100%" }}
            loading={
              updateAdvertisementMutation.isPending ||
              uploadImageMutation.isPending
            }
            onClick={() => formik.handleSubmit()}
          >
            {t("PREVIEW_BUTTON_TEXT")}
          </CustomLoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step31;
