import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useFormik } from "formik";
import * as Yup from "yup";
import useNotification from "../../../hooks/useNotification";
import useUserMutations from "../../../mutations/user";
import { parsePhoneNumber } from "libphonenumber-js"; // Import parsePhoneNumber from libphonenumber-js
import { useAppDispatch } from "../../../store";
import { updateUserInfo } from "../../../store/slices/userSlice";

// Define validation schema with Yup for the phone number
const validationSchema = (isCodeSent: boolean) =>
  Yup.object({
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .test("is-valid-phone", "Phone number is not valid", (value) => {
        if (!value) return false;
        try {
          const phoneNumber = parsePhoneNumber(value); // Use parsePhoneNumber to parse the phone number
          return phoneNumber.isValid(); // Validate the parsed phone number
        } catch {
          return false; // If parsing fails, the number is invalid
        }
      }),
    verificationCode: isCodeSent
      ? Yup.string()
          .required("Verification code is required")
          .matches(/^\d{4}$/, "Verification code must be exactly 4 digits")
      : Yup.string().notRequired(),
  });

interface PhoneNumberProps {
  openDialog: boolean;
  handleClosePhoneNumberDialog: Function;
}

const PhoneNumberDialog: React.FC<PhoneNumberProps> = ({
  openDialog,
  handleClosePhoneNumberDialog,
}) => {
  const dispatch = useAppDispatch();
  const { showSnackBar } = useNotification();
  const { sendOtpUserMutation, verifyOtpUserMutation } = useUserMutations();
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  // Initialize Formik for form handling
  const formik = useFormik({
    initialValues: {
      phoneNumber: "", // Add phone number field to initial values
      verificationCode: "",
    },
    validationSchema: validationSchema(isCodeSent),
    onSubmit: (values) => {
      if (!isCodeSent) {
        sendOtpUserMutation.mutate(
          { phoneNo: values.phoneNumber.replace(/\s/g, "") },
          {
            onSuccess: (data) => {
              showSnackBar({
                message:
                  data!.message ?? "Verification code sent to your phone!",
              });
              setIsCodeSent(true); // Set to true once the code is sent
            },
            onError: (error: Error) => {
              showSnackBar({ message: error.message, variant: "error" });
            },
          }
        );
      } else {
        verifyOtpUserMutation.mutate(
          { OTP: values.verificationCode },
          {
            onSuccess: (data) => {
              showSnackBar({
                message: data!.message ?? "OTP Verified Successfully!",
              });
              dispatch(updateUserInfo(data!.data));
              setIsCodeSent(true); // Set to true once the code is sent
              handleClosePhoneNumberDialog(false);
            },
            onError: (error: Error) => {
              showSnackBar({ message: error.message, variant: "error" });
            },
          }
        );
      }
    },
  });

  return (
    <Dialog
      open={openDialog}
      onClose={() => handleClosePhoneNumberDialog()}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 8, // Adjust border radius here
          px: {
            md: 6,
          }, // Padding inside the dialog
          py: 1,
          scrollbarWidth: "none",
          m: {
            xs: 0,
          },
          width: {
            xs: "100%",
          },
        },
      }}
    >
      <Box component={"form"} onSubmit={formik.handleSubmit}>
        <DialogTitle component={"div"} align="center">
          <Typography variant="h5" fontWeight={"bold"} mb={1}>
            Enter Your Phone Number
          </Typography>
          <Typography variant="body1">
            Mobile verification is required to activate listings and communicate
            with users.
          </Typography>
          <Typography variant="body1">
            This ensures the security of our community and lets others know that
            you are a real person.
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {!isCodeSent && (
              <>
                <Grid item xs={12}>
                  <Typography>Phone Number</Typography>
                </Grid>
                <Grid item xs={12}>
                  <MuiTelInput
                    defaultCountry="US"
                    value={formik.values.phoneNumber}
                    onChange={(value) =>
                      formik.setFieldValue("phoneNumber", value)
                    }
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.phoneNumber &&
                      Boolean(formik.errors.phoneNumber)
                    }
                    helperText={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                    sx={{
                      width: "100%",
                      "& .MuiInputBase-root": {
                        borderRadius: "4px",
                      },
                    }}
                  />
                </Grid>
              </>
            )}
            {isCodeSent && (
              <>
                <Grid item xs={12}>
                  <Typography>Verification Code</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    placeholder="Enter 4-digit code"
                    sx={{
                      width: "100%",
                      "& .MuiInputBase-root": {
                        borderRadius: "4px",
                      },
                    }}
                    id="verificationCode"
                    name="verificationCode"
                    value={formik.values.verificationCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.verificationCode &&
                      Boolean(formik.errors.verificationCode)
                    }
                    helperText={
                      formik.touched.verificationCode &&
                      formik.errors.verificationCode
                    }
                    inputProps={{
                      maxLength: 6, // Limit input to 6 characters
                    }}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <LoadingButton
                loading={
                  sendOtpUserMutation.isPending ??
                  verifyOtpUserMutation.isPending
                }
                sx={{
                  background:
                    "linear-gradient(to right, #6CC0F4, #8160D7, #F6A2A9)",
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
                onClick={() => formik.handleSubmit()}
              >
                {isCodeSent ? "Submit" : "Send Code"}{" "}
              </LoadingButton>
            </Grid>
            {!isCodeSent && (
              <Grid item xs={12}>
                <LoadingButton
                  loading={false}
                  sx={{
                    width: "100%",
                    p: 1,
                    borderRadius: "8px",
                    textTransform: "none",
                    letterSpacing: "1px",
                    fontWeight: "600",
                    fontSize: "20px",
                    border: "1px solid lightgray",
                    color: "custom.blackDark",
                  }}
                  onClick={() => handleClosePhoneNumberDialog()}
                  type="button"
                >
                  I Will do it later
                </LoadingButton>
              </Grid>
            )}
          </Grid>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default PhoneNumberDialog;
