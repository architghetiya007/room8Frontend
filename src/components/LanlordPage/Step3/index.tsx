import {
  Avatar,
  Box,
  Grid,
  OutlinedInput,
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
const landlordSchema = Yup.object().shape({
  whoAreYou: Yup.string(),
  name: Yup.string(),
  age: Yup.number(),
  haveAnychildren: Yup.string(),
  havePet: Yup.string(),
  typeOfEmployment: Yup.string(),
  doYouSmoke: Yup.string(),
  descriptionAbout: Yup.string(),
  flatmateAccepting: Yup.array().of(
    Yup.string().required("Flatmate accepting value is required")
  ),
  ageOfFutureRoomMate: Yup.array().of(Yup.number()),
  acceptTenantWithChilder: Yup.string(),
  acceptPets: Yup.string(),
  acceptSmoking: Yup.string(),
  flatmatePhoto: Yup.string(),
});

interface Step3Props {
  updateTabIndex: Function;
}
const Step3: React.FC<Step3Props> = () => {
  const { t } = useCommonTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const { updateAdvertisementMutation, getAdvertisementMutation } =
    useAdvertisementMutations();
  const { showSnackBar } = useNotification();
  const [advertisementData, setAdvertisementData] =
    useState<AdvertisementData>();
  const {
    yesNoOptions,
    yesNoOutside,
    iamAcceptingOptions,
    whoAreYou,
    commanPreferenceOptions,
    smokingOptions,
  } = useLandlord();
  const formik = useFormik({
    initialValues: {
      whoAreYou: "WOMEN",
      name: "",
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
    onSubmit: (values: any) => {
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
            window.scrollTo({top: 0, behavior: 'smooth'})
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
          <Stack direction={"column"}>
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
          <Stack direction={"column"}>
            <Typography variant="h5">Your age</Typography>
            <OutlinedInput
              value={formik.values.age}
              onChange={(e) => formik.setFieldValue("age", e.target.value)}
              fullWidth
              placeholder="Your age"
            />
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
              formik.setFieldValue("acceptTenantWithChilder", e);
            }}
            selectionOption={formik.values.acceptTenantWithChilder}
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
            loading={updateAdvertisementMutation.isPending}
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
