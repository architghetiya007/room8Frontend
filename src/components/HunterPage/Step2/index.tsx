import {
  Avatar,
  Box,
  Grid,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import useHunterData from "../../../hooks/useHunter";
import CustomButtonGroup from "../../comman/CustomButtonGroup";
import { LoadingButton } from "@mui/lab";
import OutlinedButton from "../../comman/OutlinedButton";
import CustomLoadingButton from "../../comman/CustomLoadingButton";
import useCommonTranslation from "../../../hooks/useCommonTranslation";
import { useFormik } from "formik";
import * as Yup from "yup";
const anotherPersonSchema = Yup.object().shape({
  name: Yup.string(),
  age: Yup.number().min(0, "Age must be a positive number"),
  gender: Yup.string(),
});

const step2Schema = Yup.object().shape({
  maximumNumberOfpeople: Yup.number().min(
    0,
    "Number of people must be at least 0"
  ),
  minimumRoomSize: Yup.number().min(0, "Room size must be positive"),
  furnishedRoom: Yup.string(),
  privateBathroom: Yup.string(),
  balconyInRoom: Yup.string(),
  whoAreYou: Yup.string(),
  name: Yup.string(),
  age: Yup.number().min(0, "Age must be positive"),
  withChild: Yup.string(),
  havePet: Yup.string(),
  typeOfEmployment: Yup.string(),
  areYouSmoking: Yup.string(),
  anotherPerson: Yup.array().of(anotherPersonSchema),
  flatmatePreference: Yup.array().of(Yup.string()), // Assuming string values are allowed
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
  const { t } = useCommonTranslation();

  const { whoAreYou, yesNoOptions, smokingOptions, yesNoPreferenceOptions } =
    useHunterData();

  useFormik({
    initialValues: {
      email: "",
      password: "",
      keepSignedIn: false,
    },
    validationSchema: step2Schema,
    onSubmit: (values) => {
      console.log(values)
    },
  });
  return (
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
          optionClick={(e: string) => console.log(e)}
          options={whoAreYou}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack direction={"column"}>
          <Typography variant="h5">{t("nameQuestion")}</Typography>
          <OutlinedInput fullWidth placeholder="No Preferences" />
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack direction={"column"}>
          <Typography variant="h5">{t("ageQuestion")}</Typography>
          <OutlinedInput fullWidth placeholder="No Preferences" />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{t("withChildQuestion")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={yesNoOptions}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{t("havePetQuestion")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={yesNoOptions}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{t("typeOfEmploymentQuestion")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{t("areYouSmokingQuestion")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={smokingOptions}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack direction={"column"}>
          <Typography variant="h5">
            {t("anotherPersonQuestion.name")}
          </Typography>
          <OutlinedInput fullWidth placeholder="No Preferences" />
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack direction={"column"}>
          <Typography variant="h5">{t("anotherPersonQuestion.age")}</Typography>
          <OutlinedInput fullWidth placeholder="No Preferences" />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">
          {t("anotherPersonQuestion.gender")}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <LoadingButton
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
        <Typography variant="h5">{t("flatmatePreferenceQuestion")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={smokingOptions}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{t("livingWithOwnerQuestion")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={yesNoPreferenceOptions}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{t("tenantsWithChildrenQuestion")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={yesNoPreferenceOptions}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{t("acceptPetQuestion")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={yesNoPreferenceOptions}
          selectionOption="entireRoom"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{t("acceptSmokingQuestion")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomButtonGroup
          optionClick={(e: string) => console.log(e)}
          options={smokingOptions}
          selectionOption="entireRoom"
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
          ></Avatar>
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
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <OutlinedButton>{t("BACK_BUTTON_TEXT")}</OutlinedButton>
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomLoadingButton sx={{ width: "100%" }}>
          {t("PREVIEW_BUTTON_TEXT")}
        </CustomLoadingButton>
      </Grid>
    </Grid>
  );
};

export default Step2;
