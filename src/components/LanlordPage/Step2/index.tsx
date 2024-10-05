import {
  Avatar,
  Box,
  FormControlLabel,
  Grid,
  OutlinedInput,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AdvertisementType } from "../../../utils/advertisement";
import useLandlord from "../../../hooks/useLandlord";
import useAdvertisementMutations from "../../../mutations/advertisement";
import useNotification from "../../../hooks/useNotification";
import CustomButtonGroup from "../../comman/CustomButtonGroup";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import OutlinedButton from "../../comman/OutlinedButton";
import CustomLoadingButton from "../../comman/CustomLoadingButton";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";
import { AdvertisementData } from "../../../types/advertisement";
const landlordSchema = Yup.object().shape({
  roomSize: Yup.string(),
  howManyPropleInRoom: Yup.string(),
  isRoomFurnished: Yup.string().required("Is room furnished is required"),
  bed: Yup.string(),
  privateBathroom: Yup.string(),
  doesRoomHaveBalcony: Yup.string(),
  dateAvailable: Yup.string(),
  minimumStay: Yup.string(),
  maximumStay: Yup.string(),
  rentPerMonth: Yup.string(),
  billIncludeInRent: Yup.string().required("Bill included in rent is required"),
  deposit: Yup.string(),
  descriptionOfFlat: Yup.string(),
  photosOfPlace: Yup.array().of(Yup.string().required("Photo URL is required")),
});

interface Step2Props {
  updateTabIndex: Function;
}
const Step2: React.FC<Step2Props> = () => {
  const navigate = useNavigate();
  const params = useParams();
  // const { t } = useCommonTranslation();
  const { updateAdvertisementMutation, getAdvertisementMutation } =
    useAdvertisementMutations();
  const { showSnackBar } = useNotification();
  const {
    howManyPropleInRoom,
    yesNoPartiallyOptions,
    bedOptions,
    yesNoOptions,
  } = useLandlord();
  const [advertisementData, setAdvertisementData] =
    useState<AdvertisementData>();
  const formik = useFormik({
    initialValues: {
      roomSize: "",
      howManyPropleInRoom: "02",
      isRoomFurnished: "YES",
      bed: "DOUBLE",
      privateBathroom: "YES",
      doesRoomHaveBalcony: "YES",
      dateAvailable: "",
      minimumStay: "",
      maximumStay: "",
      rentPerMonth: "",
      billIncludeInRent: "YES",
      deposit: "",
      descriptionOfFlat: "",
      photosOfPlace: [],
    },
    validationSchema: landlordSchema,
    onSubmit: (values) => {
      const body = {
        advertiseType: AdvertisementType.LANDLORD,
        landlordData: {
          ...advertisementData?.landlordData,
          ...values,
          dateAvailable:
            values.dateAvailable ?? new Date(values.dateAvailable).valueOf(),
        },
      };
      updateAdvertisementMutation.mutate(
        { advertisementId: params.id ?? "", data: body },
        {
          onSuccess: (data) => {
            showSnackBar({ message: data!.message });
            if (data!.data.landlordData!.doYouLiveHere === "YES") {
              navigate(`/landlord/3/${data?.data._id}`);
            } else {
              navigate(`/landlord/31/${data?.data._id}`);
            }
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
          <Typography>Step 2/3</Typography>
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
            Room information
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ borderBottom: "1px solid black" }}></Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Room Size</Typography>
        </Grid>
        <Grid item xs={12}>
          <OutlinedInput
            fullWidth
            placeholder="No Preferences"
            value={formik.values.roomSize}
            onChange={(e) => formik.setFieldValue("roomSize", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">
            How many people can the room accommodate?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("howManyPropleInRoom", e);
            }}
            selectionOption={formik.values.howManyPropleInRoom}
            options={howManyPropleInRoom}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Is the room furnished?</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("isRoomFurnished", e);
            }}
            selectionOption={formik.values.isRoomFurnished}
            options={yesNoPartiallyOptions}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5"> Bed</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("bed", e);
            }}
            selectionOption={formik.values.bed}
            options={bedOptions}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5"> Private bathroom?</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("privateBathroom", e);
            }}
            selectionOption={formik.values.privateBathroom}
            options={yesNoOptions}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5"> Does the room have a balcony?</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButtonGroup
            optionClick={(e: string[] | string) => {
              formik.setFieldValue("doesRoomHaveBalcony", e);
            }}
            selectionOption={formik.values.doesRoomHaveBalcony}
            options={yesNoOptions}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ borderBottom: "1px solid black" }}></Box>
        </Grid>
        <Grid item xs={12}>
          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <Typography>Date available: </Typography>
            <Box>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Available Now:"
                labelPlacement="start"
              />
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Date"
                // value={formik.values?.dateAvailable ?? undefined}
                onChange={(newValue) => {
                  formik.setFieldValue("dateAvailable", newValue);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5"> Minimum length of stay</Typography>
        </Grid>
        <Grid item xs={12}>
          <OutlinedInput
            value={formik.values.minimumStay}
            onChange={(e) =>
              formik.setFieldValue("minimumStay", e.target.value)
            }
            fullWidth
            placeholder="100"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5"> Maximum length of stay</Typography>
        </Grid>
        <Grid item xs={12}>
          <OutlinedInput
            value={formik.values.maximumStay}
            onChange={(e) =>
              formik.setFieldValue("maximumStay", e.target.value)
            }
            fullWidth
            placeholder="100"
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
            Price
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Stack
            spacing={2}
            direction={"column"}
            alignItems={"flex-start"}
            justifyContent={"center"}
            sx={{ border: "1px solid red", borderRadius: "8px", p: 4 }}
          >
            <Typography>Rent per month</Typography>
            <OutlinedInput
              fullWidth
              placeholder="Rent per month"
              value={formik.values.rentPerMonth}
              type="number"
              onChange={(e) =>
                formik.setFieldValue("rentPerMonth", e.target.value)
              }
            />
            <Typography>Bill included in rent</Typography>
            <CustomButtonGroup
              optionClick={(e: string[] | string) => {
                formik.setFieldValue("billIncludeInRent", e);
              }}
              selectionOption={formik.values.billIncludeInRent}
              options={yesNoPartiallyOptions}
            />
            <Stack
              sx={{
                backgroundColor: "#FFE5E8",
                borderRadius: "8px",
                p: 4,
                width: "100%",
              }}
            >
              <Typography>
                (It is good practice to include information in the ad
                description about how much the bills are. You will be able to
                add this information below)
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Deposit</Typography>
        </Grid>
        <Grid item xs={12}>
          <OutlinedInput
            fullWidth
            placeholder="Your Message"
            value={formik.values.deposit}
            type="number"
            onChange={(e) => formik.setFieldValue("deposit", e.target.value)}
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
            value={formik.values.descriptionOfFlat}
            onChange={(e) =>
              formik.setFieldValue("descriptionOfFlat", e.target.value)
            }
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
          <OutlinedButton>BACK</OutlinedButton>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomLoadingButton
            loading={updateAdvertisementMutation.isPending}
            sx={{ width: "100%" }}
            onClick={() => formik.handleSubmit()}
          >
            NEXT
          </CustomLoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Step2;
