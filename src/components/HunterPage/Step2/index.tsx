import {
  Avatar,
  Box,
  FormControl,
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
const anotherPersonSchema = Yup.object().shape({
  name: Yup.string(),
  age: Yup.number().min(0, "Age must be a positive number"),
  gender: Yup.string(),
});

const step2Schema = Yup.object().shape({
  whoAreYou: Yup.string(),
  name: Yup.string(),
  age: Yup.number().min(0, "Age must be positive").nullable(),
  withChild: Yup.string(),
  havePet: Yup.string(),
  typeOfEmployment: Yup.string(),
  areYouSmoking: Yup.string(),
  anotherPerson: Yup.array().of(anotherPersonSchema),
  flatmatePreference: Yup.array().of(Yup.string()).nullable(), // Assuming string values are allowed
  livingWithOwner: Yup.string(),
  tenantsWithChildren: Yup.string(),
  acceptPet: Yup.string(),
  acceptSmoking: Yup.string(),
  photos: Yup.string().url("Invalid photo URL"),
  describeYourSelf: Yup.string(),
});
interface Step2Props {
  updateTabIndex: Function;
}
const Step2: React.FC<Step2Props> = () => {
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
      whoAreYou: "WOMEN", // e.g., "MEN"
      name: "", // e.g., "John Doe"
      age: 0, // e.g., 30
      withChild: "YES", // e.g., "YES"
      havePet: "NO", // e.g., "YES"
      typeOfEmployment: "HYBRID_WORK", // e.g., "HYBRID_WORK"
      areYouSmoking: "YES", // e.g., "YES"
      anotherPerson: [
        {
          name: "", // e.g., "Jane Doe"
          age: 0, // e.g., 28
          gender: "", // e.g., "FEMALE"
        },
      ],
      flatmatePreference: ["WOMAN"], // e.g., ["string"]
      livingWithOwner: "NO_PREFERENCE", // e.g., "NO"
      tenantsWithChildren: "NO_PREFERENCE", // e.g., "NO"
      acceptPet: "NO_PREFERENCE", // e.g., "NO"
      acceptSmoking: "YES", // e.g., "YES"
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
          typeOfEmployment:
            data!.data!.hunterData?.typeOfEmployment ?? "HYBRID_WORK",
          flatmatePreference: data!.data!.hunterData?.flatmatePreference ?? [
            "WOMAN",
          ],
        });
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

  return (
    <FormikProvider value={formik}>
      <Box component={"form"} onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} mt={2} mb={2}>
          <Grid item xs={12}>
            <Typography>Step 2/2</Typography>
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
              {t("hunterStep2Title")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ borderBottom: "1px solid black" }}></Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">{t("whoAreYouQuestion")}</Typography>
          </Grid>
          <Grid item xs={12}>
            <CustomButtonGroup
              optionClick={(e: string[] | string) => {
                formik.setFieldValue("whoAreYou", e);
              }}
              selectionOption={formik.values.whoAreYou}
              options={whoAreYou}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction={"column"} spacing={1}>
              <Typography variant="h5">{t("nameQuestion")}</Typography>
              <OutlinedInput
                value={formik.values.name}
                onChange={(e) => formik.setFieldValue("name", e.target.value)}
                fullWidth
                placeholder="Your Name"
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction={"column"} spacing={1}>
              <Typography variant="h5">{t("ageQuestion")}</Typography>
              <OutlinedInput
                value={formik.values.age}
                onChange={(e) => formik.setFieldValue("age", e.target.value)}
                fullWidth
                placeholder="Your age"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">{t("withChildQuestion")}</Typography>
          </Grid>
          <Grid item xs={12}>
            <CustomButtonGroup
              optionClick={(e: string[] | string) => {
                formik.setFieldValue("withChild", e);
              }}
              selectionOption={formik.values.withChild}
              options={yesNoOptions}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">{t("havePetQuestion")}</Typography>
          </Grid>
          <Grid item xs={12}>
            <CustomButtonGroup
              optionClick={(e: string[] | string) => {
                formik.setFieldValue("havePet", e);
              }}
              selectionOption={formik.values.havePet}
              options={yesNoOptions}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">
              {t("typeOfEmploymentQuestion")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Select
                labelId="work-status-label"
                id="work-status"
                value={formik.values.typeOfEmployment}
                onChange={(e) => {
                  formik.setFieldValue("typeOfEmployment", e.target.value);
                }}
              >
                {typeOfEmployment.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {t(option.name)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">{t("areYouSmokingQuestion")}</Typography>
          </Grid>
          <Grid item xs={12}>
            <CustomButtonGroup
              optionClick={(e: string[] | string) => {
                formik.setFieldValue("areYouSmoking", e);
              }}
              selectionOption={formik.values.areYouSmoking}
              options={smokingOptions}
            />
          </Grid>
          <Grid item xs={12}>
            {formik.values.anotherPerson.length > 0 && (
              <Typography variant="h6">Another Persons</Typography>
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
                          p: 1,
                        }}
                        key={person.name}
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography>{index + 1}</Typography>
                        <Typography>{person.name}</Typography>
                        <Typography>{person.age}</Typography>
                        <Typography>{person.gender}</Typography>
                        <IconButton type="button" onClick={() => remove(index)}>
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
              <Typography variant="h5">
                {t("anotherPersonQuestion.name")}
              </Typography>
              <OutlinedInput
                value={anotherPerson.name}
                onChange={(e) =>
                  setAnotherPerson({ ...anotherPerson, name: e.target.value })
                }
                fullWidth
                placeholder="No Preferences"
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction={"column"} spacing={1}>
              <Typography variant="h5">
                {t("anotherPersonQuestion.age")}
              </Typography>
              <OutlinedInput
                type="number"
                value={anotherPerson.age}
                onChange={(e) =>
                  setAnotherPerson({ ...anotherPerson, age: e.target.value })
                }
                fullWidth
                placeholder="No Preferences"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">
              {t("anotherPersonQuestion.gender")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CustomButtonGroup
              optionClick={(e: string[] | string) => {
                setAnotherPerson({ ...anotherPerson, gender: e as string });
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
              {t("flatemateTitle")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ borderBottom: "1px solid black" }}></Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">
              {t("flatmatePreferenceQuestion")}
            </Typography>
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
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">{t("livingWithOwnerQuestion")}</Typography>
          </Grid>
          <Grid item xs={12}>
            <CustomButtonGroup
              optionClick={(e: string[] | string) => {
                formik.setFieldValue("livingWithOwner", e);
              }}
              selectionOption={formik.values.livingWithOwner}
              options={commanPreferenceOptions}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">
              {t("tenantsWithChildrenQuestion")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CustomButtonGroup
              optionClick={(e: string[] | string) => {
                formik.setFieldValue("tenantsWithChildren", e);
              }}
              selectionOption={formik.values.tenantsWithChildren}
              options={commanPreferenceOptions}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">{t("acceptPetQuestion")}</Typography>
          </Grid>
          <Grid item xs={12}>
            <CustomButtonGroup
              optionClick={(e: string[] | string) => {
                formik.setFieldValue("acceptPet", e);
              }}
              selectionOption={formik.values.acceptPet}
              options={commanPreferenceOptions}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">{t("acceptSmokingQuestion")}</Typography>
          </Grid>
          <Grid item xs={12}>
            <CustomButtonGroup
              optionClick={(e: string[] | string) => {
                formik.setFieldValue("acceptSmoking", e);
              }}
              selectionOption={formik.values.acceptSmoking}
              options={smokingOptions}
            />
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
              <Typography variant="h6">
                {t("photosHunterQuestion.title")}
              </Typography>
              <Typography>{t("photosHunterQuestion.subTitle1")}</Typography>
              <Typography>{t("photosHunterQuestion.subTitle2")}</Typography>
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
            <Typography variant="h5">
              {t("describeYourSelfQuestion.title")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: "14px" }}>
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
          </Grid>
          <Grid item xs={12} md={6}>
            <OutlinedButton
              type="button"
              onClick={() => navigate(`/hunter/1/${advertisementData?._id}`)}
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
    </FormikProvider>
  );
};

export default Step2;
