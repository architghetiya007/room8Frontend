import { useMutation } from "@tanstack/react-query";
import {
  changePasswordAPI,
  forgotPasswordAPI,
  googleLoginAPI,
  loginUserAPI,
  registerUserAPI,
  resetPasswordAPI,
  updateProfileAPI,
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

  return {
    registerUserMutation,
    loginUserMutation,
    googleLoginUserMutation,
    forgotPasswordUserMutation,
    resetPasswordUserMutation,
    changePasswordUserMutation,
    updateProfileUserMutation,
  };
};

export default useUserMutations;
