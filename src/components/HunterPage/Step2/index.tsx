import {
  Avatar,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useHunterData from "../../../hooks/useHunter";
import CustomButtonGroup from "../../comman/CustomButtonGroup";
import { LoadingButton } from "@mui/lab";
import OutlinedButton from "../../comman/OutlinedButton";
import CustomLoadingButton from "../../comman/CustomLoadingButton";
import useCommonTranslation from "../../../hooks/useCommonTranslation";
import { FieldArray, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import useNotification from "../../../hooks/useNotification";
import useAdvertisementMutations from "../../../mutations/advertisement";
import { AdvertisementType } from "../../../utils/advertisement";
import { useNavigate, useParams } from "react-router-dom";
import { AdvertisementData } from "../../../types/advertisement";
import useUserMutations from "../../../mutations/user";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import CommanTypography from "../../comman/CommonTypography";
const anotherPersonSchema = Yup.object().shape({
  name: Yup.string(),
  age: Yup.number().min(0, "Age must be a positive number"),
  gender: Yup.string(),
});

const step2Schema = Yup.object().shape({
  whoAreYou: Yup.string().required("Who are you is required"),
  name: Yup.string().required("Name is required"),
  age: Yup.number().min(1, "Age must be positive").required("Age is required"),
  withChild: Yup.string().required("With Child is required"),
  havePet: Yup.string().required("Have pet is required"),
  typeOfEmployment: Yup.string().required("TypeOfEmployment is required"),
  areYouSmoking: Yup.string().required("AreYouSmoking is required"),
  anotherPerson: Yup.array().of(anotherPersonSchema),
  flatmatePreference: Yup.array().of(Yup.string()).nullable(), // Assuming string values are allowed
  livingWithOwner: Yup.string().required("LivingWithOwner is required"),
  tenantsWithChildren: Yup.string().required("TenantsWithChildren is required"),
  acceptPet: Yup.string().required("AcceptPet is required"),
  acceptSmoking: Yup.string().required("AcceptSmoking is required"),
  photos: Yup.string(),
  describeYourSelf: Yup.string().required("Describe your self is required"),
});
interface Step2Props {
  updateTabIndex: Function;
}
const Step2: React.FC<Step2Props> = () => {
  const userSlice = useSelector((state: RootState) => state.user);
  const [advertisementData, setAdvertisementData] =
    useState<AdvertisementData>();
  const params = useParams();
  const { updateAdvertisementMutation, getAdvertisementMutation } =
    useAdvertisementMutations();
  const { showSnackBar } = useNotification();
  const { t } = useCommonTranslation();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { uploadImageMutation } = useUserMutations();

  const [anotherPerson, setAnotherPerson] = useState({
    name: "",
    age: "",
    gender: "MALE",
  });

  const {
    whoAreYou,
    yesNoOptions,
    smokingOptions,
    commanPreferenceOptions,
    genderOptions,
    iamAcceptingOptions,
    typeOfEmployment,
  } = useHunterData();

  const formik = useFormik({
    initialValues: {
      whoAreYou: "", // e.g., "MEN"
      name: userSlice?.user?.fullName ?? "", // e.g., "John Doe"
      age: 0, // e.g., 30
      withChild: "", // e.g., "YES"
      havePet: "", // e.g., "YES"
      typeOfEmployment: "", // e.g., "HYBRID_WORK"
      areYouSmoking: "", // e.g., "YES"
      anotherPerson: [
        {
          name: "", // e.g., "Jane Doe"
          age: 0, // e.g., 28
          gender: "", // e.g., "FEMALE"
        },
      ],
      flatmatePreference: [], // e.g., ["string"]
      livingWithOwner: "", // e.g., "NO"
      tenantsWithChildren: "", // e.g., "NO"
      acceptPet: "", // e.g., "NO"
      acceptSmoking: "", // e.g., "YES"
      photos: "", // e.g., "url_to_photo.jpg"
      describeYourSelf: "",
    },
    validationSchema: step2Schema,
    onSubmit: async (values) => {
      if (selectedImage) {
        let formData = new FormData();
        formData.append("files", selectedImage);
        let response = await uploadImageMutation.mutateAsync(formData);
        if (response?.status === true) {
          values.photos = response.data[0];
        }
      } else {
        if (!advertisementData?.hunterData?.photos) {
          showSnackBar({ message: "Please select photo", variant: "error" });
          return;
        }
      }
      const body = {
        advertiseType: AdvertisementType.HUNTER,
        hunterData: { ...advertisementData?.hunterData, ...values },
      };
      updateAdvertisementMutation.mutate(
        { advertisementId: params.id ?? "", data: body },
        {
          onSuccess: (data) => {
            // showSnackBar({ message: data!.message });
            window.scrollTo({ top: 0, behavior: "smooth" });
            navigate(`/hunter-preview/${data?.data._id}`);
          },
          onError: (error: Error) => {
            showSnackBar({ message: error.message, variant: "error" });
          },
        }
      );
    },
  });

  const addPerson = () => {
    if (!anotherPerson.name) {
      showSnackBar({ message: "Please add name" });
      return;
    }
    if (!anotherPerson.age) {
      showSnackBar({ message: "Please add age" });
      return;
    }

    if (!anotherPerson.gender) {
      showSnackBar({ message: "Please add gender" });
      return;
    }
    const updatedPersons = [
      ...formik.values.anotherPerson,
      {
        name: anotherPerson.name,
        age: anotherPerson.age,
        gender: anotherPerson.gender,
      },
    ];
    formik.setFieldValue("anotherPerson", updatedPersons);
    setAnotherPerson({
      age: "",
      name: "",
      gender: "MALE",
    });
  };

  const getAdvertisementAPI = () => {
    getAdvertisementMutation.mutate(params?.id ?? "", {
      onSuccess: (data) => {
        setAdvertisementData(data?.data);
        formik.setValues({
          ...formik.values,
          ...data!.data.hunterData,
          flatmatePreference: data!.data!.hunterData
            ?.flatmatePreference as never[],
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
  useEffect(() => {
    getAdvertisementAPI();
  }, []);
  console.log(formik.errors);
  return (
    <FormikProvider value={formik}>
      <Box component={"form"} onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} mt={2} mb={8}>
          <Grid item xs={12}>
            <Typography
              sx={{ fontSize: "22px", fontWeight: "600", color: "#6D778A" }}
            >
              Step 2/2
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
              {t("hunterStep2Title")}
            </Typography>
          </Grid>
          {/* <Grid item xs={12}>
            <Box sx={{ borderBottom: "1px solid black" }}></Box>
          </Grid> */}
          <Grid item xs={12}>
            <CommanTypography title={t("whoAreYouQuestion")} />
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
              <CommanTypography title={t("nameQuestion")} />
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
              <CommanTypography title={t("ageQuestion")} />
              <OutlinedInput
                value={formik.values.age}
                onChange={(e) => formik.setFieldValue("age", e.target.value)}
                fullWidth
                inputProps={{
                  min: "0",
                }}
                placeholder="Your age"
                type="number"
                error={formik.touched.age && !!formik.errors.age}
              />
              {formik.errors.age && (
                <FormHelperText sx={{ color: "red" }}>
                  {formik.errors.age.toString()}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <CommanTypography title={t("withChildQuestion")} />
          </Grid>
          <Grid item xs={12}>
            <CustomButtonGroup
              optionClick={(e: string[] | string) => {
                formik.setFieldValue("withChild", e);
              }}
              selectionOption={formik.values.withChild}
              options={yesNoOptions}
            />
            {formik.errors.withChild && (
              <FormHelperText sx={{ color: "red" }}>
                {formik.errors.withChild.toString()}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <CommanTypography title={t("havePetQuestion")} />
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
            <CommanTypography title={t("typeOfEmploymentQuestion")} />
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
            <CommanTypography title={t("areYouSmokingQuestion")} />
          </Grid>
          <Grid item xs={12}>
            <CustomButtonGroup
              optionClick={(e: string[] | string) => {
                formik.setFieldValue("areYouSmoking", e);
              }}
              selectionOption={formik.values.areYouSmoking}
              options={smokingOptions}
            />
            {formik.errors.areYouSmoking && (
              <FormHelperText sx={{ color: "red" }}>
                {formik.errors.areYouSmoking.toString()}
              </FormHelperText>
            )}
          </Grid>
          {(formik.values.whoAreYou === "GROUP_FRIEND" ||
            formik.values.whoAreYou === "COUPLE") && (
            <>
              <Grid item xs={12}>
                {formik.values.anotherPerson.length > 0 && (
                  <Typography variant="h5">Another Persons</Typography>
                )}
                <FieldArray name="anotherPerson">
                  {({ remove }) => {
                    return (
                      <div>
                        {formik.values.anotherPerson.map((person, index) => (
                          <Stack
                            sx={{
                              border: "1px solid #f6f6f6",
                              borderRadius: 1,
                              py: 1,
                            }}
                            key={person.name}
                            display={"flex"}
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                          >
                            <Box
                              sx={{ display: "flex", flexDirection: "column" }}
                            >
                              <Typography variant="h3">
                                {person.name}
                              </Typography>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Typography variant="h5">
                                  {person.age} years old,{" "}
                                </Typography>
                                <Typography variant="h5">
                                  {person.gender}
                                </Typography>
                              </Box>
                            </Box>

                            <IconButton
                              type="button"
                              onClick={() => remove(index)}
                            >
                              <DeleteOutlineIcon />
                            </IconButton>
                          </Stack>
                        ))}
                      </div>
                    );
                  }}
                </FieldArray>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack direction={"column"} spacing={1}>
                  <CommanTypography title={t("anotherPersonQuestion.name")} />
                  <OutlinedInput
                    value={anotherPerson.name}
                    onChange={(e) =>
                      setAnotherPerson({
                        ...anotherPerson,
                        name: e.target.value,
                      })
                    }
                    fullWidth
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack direction={"column"} spacing={1}>
                  <CommanTypography title={t("anotherPersonQuestion.age")} />

                  <OutlinedInput
                    type="number"
                    value={anotherPerson.age}
                    onChange={(e) =>
                      setAnotherPerson({
                        ...anotherPerson,
                        age: e.target.value,
                      })
                    }
                    inputProps={{
                      min: "0",
                    }}
                    fullWidth
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <CommanTypography title={t("anotherPersonQuestion.gender")} />
              </Grid>
              <Grid item xs={12}>
                <CustomButtonGroup
                  optionClick={(e: string[] | string) => {
                    setAnotherPerson({
                      ...anotherPerson,
                      gender: e as string,
                    });
                  }}
                  selectionOption={anotherPerson.gender}
                  options={genderOptions}
                />
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  onClick={() => addPerson()}
                  sx={{
                    background:
                      "linear-gradient(to right, #4AB1F1, #566CEC, #D749AF, #FF7C51)",
                    width: "100%",
                    p: 1,
                    borderRadius: "8px",
                    color: "white",
                    textTransform: "none",
                    letterSpacing: "1px",
                    fontWeight: "600",
                    fontSize: "24px",
                  }}
                  type="button"
                >
                  {t("anotherPersonQuestion.addAnotherPerson")}
                </LoadingButton>
              </Grid>
            </>
          )}

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
                fontSize: "44px",
              }}
            >
              {t("flatemateTitle")}
            </Typography>
          </Grid>
          {/* <Grid item xs={12}>
            <Box sx={{ borderBottom: "1px solid black" }}></Box>
          </Grid> */}
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
            {formik.errors.flatmatePreference && (
              <FormHelperText sx={{ color: "red" }}>
                {formik.errors.flatmatePreference.toString()}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <CommanTypography title={t("livingWithOwnerQuestion")} />
          </Grid>
          <Grid item xs={12}>
            <CustomButtonGroup
              optionClick={(e: string[] | string) => {
                formik.setFieldValue("livingWithOwner", e);
              }}
              selectionOption={formik.values.livingWithOwner}
              options={commanPreferenceOptions}
            />
            {formik.errors.livingWithOwner && (
              <FormHelperText sx={{ color: "red" }}>
                {formik.errors.livingWithOwner.toString()}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <CommanTypography title={t("tenantsWithChildrenQuestion")} />
          </Grid>
          <Grid item xs={12}>
            <CustomButtonGroup
              optionClick={(e: string[] | string) => {
                formik.setFieldValue("tenantsWithChildren", e);
              }}
              selectionOption={formik.values.tenantsWithChildren}
              options={commanPreferenceOptions}
            />
            {formik.errors.tenantsWithChildren && (
              <FormHelperText sx={{ color: "red" }}>
                {formik.errors.tenantsWithChildren.toString()}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <CommanTypography title={t("acceptPetQuestion")} />
          </Grid>
          <Grid item xs={12}>
            <CustomButtonGroup
              optionClick={(e: string[] | string) => {
                formik.setFieldValue("acceptPet", e);
              }}
              selectionOption={formik.values.acceptPet}
              options={commanPreferenceOptions}
            />
            {formik.errors.acceptPet && (
              <FormHelperText sx={{ color: "red" }}>
                {formik.errors.acceptPet.toString()}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <CommanTypography title={t("acceptSmokingQuestion")} />
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
          {/* <Grid item xs={12}>
            <Box sx={{ borderBottom: "1px solid black" }}></Box>
          </Grid> */}
          <Grid item xs={12}>
            <Stack
              spacing={1}
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              sx={{ border: "1px solid red", borderRadius: "8px", p: 4 }}
            >
              <CommanTypography title={t("photosHunterQuestion.title")} />
              <Typography
                sx={{ fontWeight: "500", fontSize: "20px", color: "#6D778A" }}
              >
                {t("photosHunterQuestion.subTitle1")}
              </Typography>
              <Typography
                sx={{ fontWeight: "500", fontSize: "20px", color: "#6D778A" }}
              >
                {t("photosHunterQuestion.subTitle2")}
              </Typography>
              <Avatar
                sx={{
                  width: 80, // Set the width
                  height: 80, // Set the height
                }}
                src={
                  preview
                    ? preview
                    : advertisementData?.hunterData?.photos ?? ""
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
                onClick={handleClick}
              >
                {t("photosHunterQuestion.buttonText")}
              </LoadingButton>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <CommanTypography title={t("describeYourSelfQuestion.title")} />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ fontWeight: "500", fontSize: "20px", color: "#6D778A" }}
            >
              {t("describeYourSelfQuestion.subTitle")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <OutlinedInput
              multiline
              minRows={4}
              fullWidth
              placeholder="Your Message"
              value={formik.values.describeYourSelf}
              onChange={(e) =>
                formik.setFieldValue("describeYourSelf", e.target.value)
              }
            />
            {formik.errors.describeYourSelf && (
              <FormHelperText sx={{ color: "red" }}>
                {formik.errors.describeYourSelf.toString()}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} mb={2} mt={2}>
            <Box sx={{ borderBottom: "1px solid black" }}></Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <OutlinedButton
              sx={{ height: "72px" }}
              type="button"
              onClick={() => navigate(`/hunter/1/${advertisementData?._id}`)}
            >
              {t("BACK_BUTTON_TEXT")}
            </OutlinedButton>
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomLoadingButton
              disabled={!formik.isValid}
              sx={{ width: "100%", height: "72px" }}
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
    </FormikProvider>
  );
};

export default Step2;
