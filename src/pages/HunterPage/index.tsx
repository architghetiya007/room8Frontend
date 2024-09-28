import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import Step1 from "../../components/HunterPage/Step1";
import Step2 from "../../components/HunterPage/Step2";
import { useFormik } from "formik";
import * as Yup from "yup";
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
});
const HunterPage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      keepSignedIn: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //   loginUserMutation.mutate(values, {
      //     onSuccess: (data) => {
      //       showSnackBar({ message: data!.message });
      //       let user: AuthStorageDTO = {
      //         token: data!.data.token,
      //         refreshToken: data!.data.user.refreshToken,
      //         user: data!.data.user,
      //       };
      //       storeTokenDetails(user);
      //       dispatch(setUserInfo(user));
      //       handleCloseLoginDialog(!data!.data.user.isPhoneVerify ? 'Phone' :'');
      //     },
      //     onError: (error: Error) => {
      //       showSnackBar({ message: error.message, variant: "error" });
      //     },
      //   });
    },
  });

  const updateTabIndex = () => {
    setTabIndex(tabIndex + 1);
  };
  return (
    <Box>
      <Container>
        {tabIndex === 1 && <Step1 updateTabIndex={updateTabIndex} />}
        {tabIndex === 2 && <Step2 updateTabIndex={updateTabIndex} />}
      </Container>
    </Box>
  );
};

export default HunterPage;
