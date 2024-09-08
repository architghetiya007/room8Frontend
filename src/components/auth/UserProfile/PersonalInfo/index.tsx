import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useUserMutations from "../../../../mutations/user";
import useNotification from "../../../../hooks/useNotification";
import { LoadingButton } from "@mui/lab";
import {
  Grid,
  Typography,
  TextField,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../../store";
import { updateUserInfo } from "../../../../store/slices/userSlice";
const validationSchema = Yup.object({
  fullName: Yup.string().required("Name is required"),
});
const PersonalInfo: React.FC = () => {
  const userSlice = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const { showSnackBar } = useNotification();
  const { updateProfileUserMutation, uploadImageMutation } = useUserMutations();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      fullName: userSlice.user?.fullName ?? "",
      profilePic: userSlice.user?.profilePic ?? "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (selectedImage) {
        let formData = new FormData();
        formData.append("files", selectedImage);
        let response = await uploadImageMutation.mutateAsync(formData);
        if (response?.status === true) {
          values.profilePic = response.data[0];
        }
      }
      updateProfileUserMutation.mutate(values, {
        onSuccess: (data) => {
          showSnackBar({ message: data!.message });
          dispatch(updateUserInfo(data!.data));
          formik.resetForm();
        },
        onError: (error: Error) => {
          showSnackBar({ message: error.message, variant: "error" });
        },
      });
    },
  });

  // Function to handle image change
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

  // Function to trigger file input click
  const handleClick = () => {
    const fileInput = document.getElementById(
      "profile-image-input"
    ) as HTMLInputElement;
    fileInput?.click();
  };
  return (
    <Box component={"form"} onSubmit={formik.handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <Avatar
              alt="Profile Image"
              src={preview ? preview : userSlice.user?.profilePic ?? ""}
              sx={{ width: 120, height: 120, mb: 1 }} // Style for Avatar
            />
            <input
              type="file"
              id="profile-image-input"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }} // Hide file input
            />
            <Button
              sx={{
                backgroundColor: "#D749AF",
                color: "custom.white",
                borderRadius: "8px",
                textTransform: "none",
                letterSpacing: "1px",
                fontSize: "16px",
              }}
              type="button"
              variant="contained"
              onClick={handleClick}
            >
              Choose Profile Image
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography>Name</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            placeholder="Enter Your Name"
            sx={{
              width: "100%", // Adjust width as needed
              "& .MuiInputBase-root": {
                borderRadius: "4px", // Adjust border radius as needed
              },
            }}
            id="fullName"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>Email</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            disabled
            variant="outlined"
            placeholder="Enter Your Email"
            sx={{
              width: "100%", // Adjust width as needed
              "& .MuiInputBase-root": {
                borderRadius: "4px", // Adjust border radius as needed
              },
            }}
            id="email"
            name="email"
            value={userSlice.user?.email}
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            loading={
              uploadImageMutation.isPending ??
              updateProfileUserMutation.isPending
            }
            sx={{
              background:
                "linear-gradient(to right, #4AB1F1, #566CEC, #D749AF, #FF7C51)",
              pl: 2,
              pr: 2,
              borderRadius: "8px",
              color: "white",
              textTransform: "none",
              letterSpacing: "1px",
              fontWeight: "600",
              fontSize: "16px",
              mt: 1,
            }}
            type="button"
            onClick={() => formik.handleSubmit()}
          >
            Update Profile
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalInfo;
