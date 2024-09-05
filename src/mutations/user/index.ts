import { useMutation } from "@tanstack/react-query";
import {
  googleLoginAPI,
  loginUserAPI,
  registerUserAPI,
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

  return {
    registerUserMutation,
    loginUserMutation,
    googleLoginUserMutation,
  };
};

export default useUserMutations;
