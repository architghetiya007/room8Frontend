import {
  Avatar,
  Box,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
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
import CommanTypography from "../../comman/CommonTypography";
import IOSSwitch from "../../comman/IOSSwitch";
import dayjs from "dayjs";
import { t } from "i18next";
import useHunterData from "../../../hooks/useHunter";
import useUserMutations from "../../../mutations/user";
const landlordSchema = Yup.object().shape({
  roomSize: Yup.string().nullable(),
  howManyPropleInRoom: Yup.string(),
  isRoomFurnished: Yup.string().required("Is room furnished is required"),
  bed: Yup.string(),
  privateBathroom: Yup.string(),
  doesRoomHaveBalcony: Yup.string(),
  isAvailableNow: Yup.boolean(),
  dateAvailable: Yup.string().nullable(),
  minimumStay: Yup.string(),
  maximumStay: Yup.string(),
  rentPerMonth: Yup.string(),
  billIncludeInRent: Yup.string().required("Bill included in rent is required"),
  deposit: Yup.string(),
  descriptionOfFlat: Yup.string(),
  photosOfPlace: Yup.array().of(Yup.string()),
});

interface RoomFormValues {
  roomSize: string; // Assuming roomSize is a string (you may want to specify number if it's numeric)
  howManyPropleInRoom: string; // Keeping as string; consider using number if it's always numeric
  isRoomFurnished: string; // Assuming it's a string, could also be a boolean
  bed: string; // Bed type as string
  privateBathroom: string; // Assuming it's a string (could also be a boolean)
  doesRoomHaveBalcony: string; // Assuming it's a string (could also be a boolean)
  isAvailableNow: boolean;
  dateAvailable: string; // Keeping as string (consider using Date type if it's a date)
  minimumStay: string; // Keeping as string (consider using number if numeric)
  maximumStay: string; // Keeping as string (consider using number if numeric)
  rentPerMonth: string; // Assuming rent is a string (consider using number if numeric)
  billIncludeInRent: string; // Assuming it's a string (could also be a boolean)
  deposit: string; // Keeping as string (consider using number if numeric)
  descriptionOfFlat: string; // Description as string
  photosOfPlace: string[]; // Array of strings for photos
}
interface PreviewState {
  previews: string[]; // URLs for the previews
  files: (File | string)[]; // Array containing both File objects and strings
}

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
  const { duration } = useHunterData();
  const [advertisementData, setAdvertisementData] =
    useState<AdvertisementData>();
  const { uploadImageMutation } = useUserMutations();
  const [previewState, setPreviewState] = useState<PreviewState>({
    previews: [],
    files: [],
  });
  const formik = useFormik<RoomFormValues>({
    initialValues: {
      roomSize: "",
      howManyPropleInRoom: "02",
      isRoomFurnished: "YES",
      bed: "DOUBLE",
      privateBathroom: "YES",
      doesRoomHaveBalcony: "YES",
      dateAvailable: "",
      isAvailableNow: true,
      minimumStay: "NO_PREFERENCE",
      maximumStay: "NO_PREFERENCE",
      rentPerMonth: "",
      billIncludeInRent: "YES",
      deposit: "",
      descriptionOfFlat: "",
      photosOfPlace: [],
    },
    validationSchema: landlordSchema,
    onSubmit: async (values) => {
      let array = previewState.files.filter(
        (file): file is File => file instanceof File
      );
      let stringFiles = previewState.files.filter(
        (file): file is string => typeof file === "string"
      );
      if (array.length > 5) {
        showSnackBar({
          message: "Maximum 5 image upload at a time.",
          variant: "error",
        });
        return;
      }
      if (array.length > 0) {
        let formData = new FormData();
        array.forEach((e) => {
          formData.append("files", e);
        });
        let response = await uploadImageMutation.mutateAsync(formData);
        if (response?.status === true) {
          values.photosOfPlace = [...stringFiles, ...response.data];
        }
      } else {
        values.photosOfPlace = stringFiles;
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
            if (data!.data.landlordData!.doYouLiveHere === "YES") {
              navigate(`/landlord/3/${data?.data._id}`);
            } else {
              navigate(`/landlord/31/${data?.data._id}`);
            }
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
        });
        if (data?.data.landlordData?.photosOfPlace) {
          setPreviewState({
            previews: data?.data.landlordData?.photosOfPlace,
            files: data?.data.landlordData?.photosOfPlace,
          });
        }
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
    const files = event.target.files;
    if (!files) return;

    const MAX_FILE_SIZE_MB = 2; // Maximum allowed file size in MB
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024; // Convert MB to bytes

    const newFiles = Array.from(files); // Convert FileList to array

    const validFiles = newFiles.filter(
      (file) => file.size <= MAX_FILE_SIZE_BYTES
    ); // Validate file size
    const invalidFiles = newFiles.filter(
      (file) => file.size > MAX_FILE_SIZE_BYTES
    ); //
    if (invalidFiles.length > 0) {
      showSnackBar({
        message: `Some files are too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`,
        variant: "error",
      });
      return;
      // Optionally handle or display a message about rejected files
      // You can add more specific error handling here if needed.
    }
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));

    // Update state to store file previews and uploaded files
    setPreviewState((prevState) => ({
      previews: [...prevState.previews, ...newPreviews],
      files: [...prevState.files, ...newFiles],
    }));
  };

  const handleRemove = (index: number) => {
    setPreviewState((prevState) => ({
      previews: prevState.previews.filter((_, i) => i !== index),
      files: prevState.files.filter((_, i) => i !== index),
    }));
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
          <Typography variant="h5">Room Size </Typography>
        </Grid>
        <Grid item xs={12}>
          <OutlinedInput
            fullWidth
            placeholder="No Preferences"
            value={formik.values.roomSize}
            onChange={(e) => formik.setFieldValue("roomSize", e.target.value)}
            type="number"
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
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            gap={1}
          >
            <CommanTypography title={"Available Now : "} />
            <IOSSwitch
              checked={formik.values.isAvailableNow}
              onChange={(e) => {
                formik.setFieldValue("isAvailableNow", e.target.checked);
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Date"
                value={
                  formik.values?.dateAvailable
                    ? dayjs(formik.values?.dateAvailable)
                    : null
                }
                onChange={(newValue) => {
                  formik.setFieldValue(
                    "dateAvailable",
                    newValue?.valueOf()
                  );
                  formik.setFieldValue("isAvailableNow", false);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5"> Minimum length of stay</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Select
              labelId="work-status-label"
              id="work-status"
              value={formik.values.minimumStay}
              onChange={(e) => {
                formik.setFieldValue("minimumStay", e.target.value);
              }}
            >
              {duration.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {t(option.name)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5"> Maximum length of stay</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Select
              labelId="work-status-label"
              id="work-status"
              value={formik.values.maximumStay}
              onChange={(e) => {
                formik.setFieldValue("maximumStay", e.target.value);
              }}
            >
              {duration.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {t(option.name)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
              inputProps={{
                min: 0,
                max: 2000
              }}
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
            {previewState.previews.length > 0 && (
              <Stack direction="row" spacing={2}>
                {previewState.previews.map((preview, index) => (
                  <Stack key={index} alignItems="center">
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                      }}
                      src={preview}
                    />
                    <LoadingButton
                      onClick={() => handleRemove(index)}
                      sx={{
                        mt: 1,
                        background: "#FF7C51",
                        color: "white",
                        borderRadius: "50px",
                        textTransform: "none",
                        "&:hover": {
                          background: "#FF7C51",
                        },
                      }}
                    >
                      Remove
                    </LoadingButton>
                  </Stack>
                ))}
              </Stack>
            )}

            <input
              type="file"
              id="profile-image-input"
              accept="image/*"
              onChange={handleImageChange}
              multiple
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
            onClick={() => navigate(`/landlord/1/${advertisementData?._id}`)}
          >
            BACK
          </OutlinedButton>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomLoadingButton
            loading={
              updateAdvertisementMutation.isPending ||
              uploadImageMutation.isPending
            }
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
