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
const landlordSchema = Yup.object().shape({
  whoAreYou: Yup.string(),
  name: Yup.string(),
  age: Yup.number()
    .min(0, "Age must be non-negative")
    .max(100, "Age should be 100")
    .required("Age is required"),
  haveAnychildren: Yup.string(),
  havePet: Yup.string(),
  typeOfEmployment: Yup.string(),
  doYouSmoke: Yup.string(),
  descriptionAbout: Yup.string(),
  flatmateAccepting: Yup.array().of(
    Yup.string().required("Flatmate accepting value is required")
  ),
  ageOfFutureRoomMate: Yup.array().of(Yup.number()),
  flatmateAcceptTenantWithChildren: Yup.string(),
  acceptPets: Yup.string(),
  acceptSmoking: Yup.string(),
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
      whoAreYou: "WOMEN",
      name: userSlice?.user?.fullName ?? "",
      age: "",
      haveAnychildren: "YES",
      havePet: "NO",
      typeOfEmployment: "",
      doYouSmoke: "YES",
      descriptionAbout: "",
      flatmateAccepting: ["WOMAN"],
      ageOfFutureRoomMate: [18, 35],
      acceptTenantWithChilder: "NO_PREFERENCE",
      acceptPets: "NO_PREFERENCE",
      acceptSmoking: "YES",
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
            Now, tell something about yourself
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ borderBottom: "1px solid black" }}></Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Who are you?</Typography>
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
            <Typography variant="h5">What's your name</Typography>
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
            <Typography variant="h5">Your age</Typography>
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
          <Typography variant="h5">Do any children live with you?</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("haveAnychildren", e);
            }}
            selectionOption={formik.values.haveAnychildren}
            options={yesNoOptions}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Do you have a pet?</Typography>
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
            What do you do/type of employment?
          </Typography>
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
          </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Do you smoke?</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("doYouSmoke", e);
            }}
            selectionOption={formik.values.doYouSmoke}
            options={yesNoOutside}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">
            Write a few sentences about the place you want to rent.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: "14px" }}>
            Share a bit about yourself, your roommates, and the vibe of your
            place to help everyone get a great feel for your home.
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
              formik.setFieldValue("flatmateAccepting", e);
            }}
            multiSelect={true}
            selectionOption={formik.values.flatmateAccepting}
            options={iamAcceptingOptions}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Age of your future roommate</Typography>
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
          <Typography variant="h5">
            Do you accept tenants with children?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("flatmateAcceptTenantWithChildren", e);
            }}
            selectionOption={formik.values.flatmateAcceptTenantWithChildren}
            options={commanPreferenceOptions}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Do you accept pets?</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("acceptPets", e);
            }}
            selectionOption={formik.values.acceptPets}
            options={commanPreferenceOptions}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Do you accept smoking?</Typography>
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
          <Stack
            spacing={2}
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ border: "1px solid red", borderRadius: "8px", p: 4 }}
          >
            <Typography variant="h6">Add photos of your place</Typography>
            {/* <Typography>{t("photosHunterQuestion.subTitle1")}</Typography> */}
            <Typography>(you can also add them later)</Typography>
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
              Upload Photos
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
