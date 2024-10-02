import { useMutation } from "@tanstack/react-query";
import {
  changePasswordAPI,
  deleteAccountAPI,
  emailVerifyAPI,
  forgotPasswordAPI,
  googleLoginAPI,
  loginUserAPI,
  logoutAPI,
  registerUserAPI,
  resetPasswordAPI,
  sendOtpAPI,
  updateProfileAPI,
  uploadImageAPI,
  verifyOtpAPI,
} from "../../api/user/user";

const useUserMutations = () => {
  const registerUserMutation = useMutation({
    mutationFn: registerUserAPI,
  });

  const loginUserMutation = useMutation({
    mutationFn: loginUserAPI,
  });

  const googleLoginUserMutation = useMutation({
    mutationFn: googleLoginAPI,
  });

  const forgotPasswordUserMutation = useMutation({
    mutationFn: forgotPasswordAPI,
  });

  const resetPasswordUserMutation = useMutation({
    mutationFn: resetPasswordAPI,
  });

  const changePasswordUserMutation = useMutation({
    mutationFn: changePasswordAPI,
  });

  const updateProfileUserMutation = useMutation({
    mutationFn: updateProfileAPI,
  });

  const deleteAccountUserMutation = useMutation({
    mutationFn: deleteAccountAPI,
  });

  const logoutUserMutation = useMutation({
    mutationFn: logoutAPI,
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImageAPI,
  });

  const sendOtpUserMutation = useMutation({
    mutationFn: sendOtpAPI,
  });

  const verifyOtpUserMutation = useMutation({
    mutationFn: verifyOtpAPI,
  });

  const emailVerifyMutation = useMutation({
    mutationFn: emailVerifyAPI,
  });

  return {
    registerUserMutation,
    loginUserMutation,
    googleLoginUserMutation,
    forgotPasswordUserMutation,
    resetPasswordUserMutation,
    changePasswordUserMutation,
    updateProfileUserMutation,
    deleteAccountUserMutation,
    logoutUserMutation,
    uploadImageMutation,
    sendOtpUserMutation,
    verifyOtpUserMutation,
    emailVerifyMutation,
  };
};

export default useUserMutations;
