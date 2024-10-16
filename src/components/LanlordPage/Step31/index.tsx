import {
  Avatar,
  Box,
  FormControl,
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
const landlordSchema = Yup.object().shape({
  profilePhoto: Yup.string(),
  genderOfCurrentTenants: Yup.string(),
  currentTenantsName: Yup.string(),
  ageOfCurrentTenants: Yup.string(),
  doChildrenLiveHere: Yup.string(),
  isPetLivingInApartment: Yup.string(),
  currentTenantsEmployment: Yup.string(),
  tenantsSmoking: Yup.string(),
  preferenceOfFutureTenants: Yup.array().of(
    Yup.string().required("Preference of future tenant is required")
  ),
  ageRangeOfFutureRoommate: Yup.array().of(
    Yup.number().required("Age range of future roommate is required")
  ),
  acceptTenantWithChildren: Yup.string(),
  tenantAcceptPets: Yup.string(),
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
      genderOfCurrentTenants: "WOMAN",
      currentTenantsName: "",
      ageOfCurrentTenants: "",
      doChildrenLiveHere: "YES",
      isPetLivingInApartment: "YES",
      currentTenantsEmployment: "",
      tenantsSmoking: "YES",
      preferenceOfFutureTenants: ["WOMAN"],
      ageRangeOfFutureRoommate: [18, 35],
      acceptTenantWithChildren: "NO_PREFERENCE",
      tenantAcceptPets: "NO_PREFERENCE",
      tenantAcceptSmoking: "YES",
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
      <Grid container spacing={2} mt={2} mb={2}>
        <Grid item xs={12}>
          <Typography>Step 3/3</Typography>
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
            Tell us something about current tenants and your preferences
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
            <Typography variant="h6">Add your profile picture</Typography>
            {/* <Typography>{t("photosHunterQuestion.subTitle1")}</Typography> */}
            <Typography>
              (A profile with a photo builds more trust – stand out and find the
              right tenant faster!)
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
              Upload Photo
            </LoadingButton>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">
            Information about current tenants
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("genderOfCurrentTenants", e);
            }}
            selectionOption={formik.values.genderOfCurrentTenants}
            options={iamAcceptingOptions}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction={"column"} spacing={1}>
            <Typography variant="h5">Current tenant's name</Typography>
            <OutlinedInput
              value={formik.values.currentTenantsName}
              onChange={(e) =>
                formik.setFieldValue("currentTenantsName", e.target.value)
              }
              fullWidth
              placeholder="Your Name"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction={"column"} spacing={1}>
            <Typography variant="h5">Age of current tenant</Typography>
            <OutlinedInput
              value={formik.values.ageOfCurrentTenants}
              onChange={(e) =>
                formik.setFieldValue("ageOfCurrentTenants", e.target.value)
              }
              fullWidth
              placeholder="Your age"
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Do children live here?</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("doChildrenLiveHere", e);
            }}
            selectionOption={formik.values.doChildrenLiveHere}
            options={yesNoOptions}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">
            Is there a pet living in the apartment?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("isPetLivingInApartment", e);
            }}
            selectionOption={formik.values.isPetLivingInApartment}
            options={yesNoOptions}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">
            What do current tenant do/type of employment?
          </Typography>
        </Grid>
        <Grid item xs={12}>
            <FormControl fullWidth>
              <Select
                displayEmpty
                labelId="work-status-label"
                id="work-status"
                value={formik.values.currentTenantsEmployment}
                onChange={(e) => {
                  formik.setFieldValue("currentTenantsEmployment", e.target.value);
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
          </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Are the tenants smoking?</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("tenantsSmoking", e);
            }}
            selectionOption={formik.values.tenantsSmoking}
            options={yesNoOutside}
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
            Your flatmate preferences
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ borderBottom: "1px solid black" }}></Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">
            I’m accepting (you can choose many)
          </Typography>
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
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Age of your future roommate</Typography>
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
          <Typography variant="h5">
            Do you accept tenants with children?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("acceptTenantWithChildren", e);
            }}
            selectionOption={formik.values.acceptTenantWithChildren}
            options={commanPreferenceOptions}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Do you accept pets?</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("tenantAcceptPets", e);
            }}
            selectionOption={formik.values.tenantAcceptPets}
            options={commanPreferenceOptions}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Do you accept smoking?</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("tenantAcceptSmoking", e);
            }}
            selectionOption={formik.values.tenantAcceptSmoking}
            options={smokingOptions}
          />
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
