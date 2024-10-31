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
import { AdvertisementData } from "../../../types/advertisement";
import { useNavigate, useParams } from "react-router-dom";
import CustomLoadingButton from "../../comman/CustomLoadingButton";
import OutlinedButton from "../../comman/OutlinedButton";
import useCommonTranslation from "../../../hooks/useCommonTranslation";
import useUserMutations from "../../../mutations/user";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import useHunterData from "../../../hooks/useHunter";
import CommanTypography from "../../comman/CommonTypography";
const landlordSchema = Yup.object().shape({
  whoAreYou: Yup.string().required("WhoAreYou is required"),
  name: Yup.string().required("Name is required"),
  age: Yup.number()
    .min(0, "Age must be non-negative")
    .max(100, "Age should be 100")
    .required("Age is required"),
  haveAnychildren: Yup.string().required("WhoAreYou is required"),
  havePet: Yup.string().required("HavePet is required"),
  typeOfEmployment: Yup.string().required("TypeOfEmployment is required"),
  doYouSmoke: Yup.string().required("DoYouSmoke is required"),
  descriptionAbout: Yup.string().required("DescriptionAbout is required"),
  flatmateAccepting: Yup.array().of(
    Yup.string().required("Flatmate accepting value is required")
  ),
  ageOfFutureRoomMate: Yup.array().of(Yup.number()),
  flatmateAcceptTenantWithChildren: Yup.string().required(
    "DlatmateAcceptTenantWithChildren is required"
  ),
  acceptPets: Yup.string().required("AcceptPets is required"),
  acceptSmoking: Yup.string().required("AcceptSmoking is required"),
  flatmatePhoto: Yup.string(),
});

interface Step3Props {
  updateTabIndex: Function;
}
const Step3: React.FC<Step3Props> = () => {
  const userSlice = useSelector((state: RootState) => state.user);
  const { t } = useCommonTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const { updateAdvertisementMutation, getAdvertisementMutation } =
    useAdvertisementMutations();
  const { showSnackBar } = useNotification();
  const [advertisementData, setAdvertisementData] =
    useState<AdvertisementData>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { uploadImageMutation } = useUserMutations();
  const {
    yesNoOptions,
    yesNoOutside,
    iamAcceptingOptions,
    whoAreYou,
    commanPreferenceOptions,
    smokingOptions,
  } = useLandlord();
  const { typeOfEmployment } = useHunterData();
  const formik = useFormik({
    initialValues: {
      whoAreYou: "",
      name: userSlice?.user?.fullName ?? "",
      age: "",
      haveAnychildren: "",
      havePet: "",
      typeOfEmployment: "",
      doYouSmoke: "",
      descriptionAbout: "",
      flatmateAccepting: [],
      ageOfFutureRoomMate: [18, 35],
      acceptTenantWithChilder: "",
      acceptPets: "",
      acceptSmoking: "",
      flatmatePhoto: "",
    },
    validationSchema: landlordSchema,
    onSubmit: async (values: any) => {
      if (selectedImage) {
        let formData = new FormData();
        formData.append("files", selectedImage);
        let response = await uploadImageMutation.mutateAsync(formData);
        if (response?.status === true) {
          values.flatmatePhoto = response.data[0];
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
          ...data!.data.landlordData,
          flatmateAccepting:
            data!.data?.landlordData!.flatmateAccepting!.length > 0
              ? data?.data?.landlordData?.flatmateAccepting
              : ["WOMAN"],
          ageOfFutureRoomMate:
            data!.data?.landlordData!.ageOfFutureRoomMate!.length > 0
              ? data?.data?.landlordData?.ageOfFutureRoomMate
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
    <Box component={"form"} onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} mt={2} mb={2}>
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
            {t("landlordQ.tellmeAboutYourSelf")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ borderBottom: "1px solid black" }}></Box>
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.whoAreYou")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("whoAreYou", e);
            }}
            selectionOption={formik.values.whoAreYou}
            options={whoAreYou}
          />
          {formik.errors.whoAreYou && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.whoAreYou.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction={"column"} spacing={1}>
            <CommanTypography title={t("landlordQ.whatsYourName")} />
            <OutlinedInput
              value={formik.values.name}
              onChange={(e) => formik.setFieldValue("name", e.target.value)}
              fullWidth
              placeholder="Your Name"
            />
            {formik.errors.name && (
              <FormHelperText sx={{ color: "red" }}>
                {formik.errors.name.toString()}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction={"column"} spacing={1}>
            <CommanTypography title={t("landlordQ.yourAge")} />
            <OutlinedInput
              value={formik.values.age}
              onChange={(e) => formik.setFieldValue("age", e.target.value)}
              fullWidth
              placeholder="Your age"
              type="number"
              inputProps={{
                min: 0,
                max: 100,
              }}
              error={formik.touched.age && !!formik.errors.age}
            />
            {formik.errors.age && (
              <FormHelperText sx={{ color: "red" }}>
                {formik.errors.age.toString()}
              </FormHelperText>
            )}{" "}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.childrenWithYou")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("haveAnychildren", e);
            }}
            selectionOption={formik.values.haveAnychildren}
            options={yesNoOptions}
          />
          {formik.errors.haveAnychildren && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.haveAnychildren.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.havePet")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("havePet", e);
            }}
            selectionOption={formik.values.havePet}
            options={yesNoOptions}
          />
          {formik.errors.havePet && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.havePet.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.typeOFEmployment")} />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Select
              displayEmpty
              labelId="work-status-label"
              id="work-status"
              value={formik.values.typeOfEmployment}
              onChange={(e) => {
                formik.setFieldValue("typeOfEmployment", e.target.value);
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
          {formik.errors.typeOfEmployment && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.typeOfEmployment.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.doYouSmoke")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("doYouSmoke", e);
            }}
            selectionOption={formik.values.doYouSmoke}
            options={yesNoOutside}
          />
          {formik.errors.doYouSmoke && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.doYouSmoke.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.WriteSentence11")} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{ fontSize: "20px", color: "#6D778A", fontWeight: "500" }}
          >
            {t("landlordQ.writeSentence12")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <OutlinedInput
            multiline
            minRows={4}
            fullWidth
            placeholder="Your Message"
            value={formik.values.descriptionAbout}
            onChange={(e) =>
              formik.setFieldValue("descriptionAbout", e.target.value)
            }
          />
          {formik.errors.descriptionAbout && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.descriptionAbout.toString()}
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
            {t("landlordQ.yourFlateMatePref")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ borderBottom: "1px solid black" }}></Box>
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
          {formik.errors.flatmateAccepting && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.flatmateAccepting.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.AgeOFYourMate")} />
        </Grid>
        <Grid item xs={12}>
          <Slider
            aria-label="Restricted values"
            value={formik.values.ageOfFutureRoomMate}
            onChange={(_, newValue) => {
              formik.setFieldValue("ageOfFutureRoomMate", newValue);
            }}
            step={1}
            valueLabelDisplay="auto"
            max={100}
            min={0}
          />
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.acceptTenantsWithChildren")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("flatmateAcceptTenantWithChildren", e);
            }}
            selectionOption={formik.values.flatmateAcceptTenantWithChildren}
            options={commanPreferenceOptions}
          />
          {formik.errors.flatmateAcceptTenantWithChildren && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.flatmateAcceptTenantWithChildren.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.acceptPets")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("acceptPets", e);
            }}
            selectionOption={formik.values.acceptPets}
            options={commanPreferenceOptions}
          />
          {formik.errors.acceptPets && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.acceptPets.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <CommanTypography title={t("landlordQ.acceptSmoking")} />
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("acceptSmoking", e);
            }}
            selectionOption={formik.values.acceptSmoking}
            options={smokingOptions}
          />
          {formik.errors.acceptSmoking && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.acceptSmoking.toString()}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <Stack
            spacing={2}
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ border: "1px solid red", borderRadius: "8px", p: 4 }}
          >
            <CommanTypography title={t("landlordQ.photos11")} />
            {/* <Typography>{t("photosHunterQuestion.subTitle1")}</Typography> */}
            <Typography
              sx={{ fontWeight: "500", fontSize: "20px", color: "#6D778A" }}
            >
              {t("landlordQ.photos22")}
            </Typography>
            <Avatar
              sx={{
                width: 80, // Set the width
                height: 80, // Set the height
              }}
              src={
                preview
                  ? preview
                  : advertisementData?.landlordData?.flatmatePhoto ?? ""
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
              {t("landlordQ.uploadPhotos1")}
            </LoadingButton>
          </Stack>
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
export default Step3;
