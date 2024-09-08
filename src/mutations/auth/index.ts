import { useMutation } from "@tanstack/react-query";
import { refreshTokenAPI } from "../../api/auth/auth";

const useAuthMutations = () => {
  const refreshTokenMutation = useMutation({
    mutationFn: refreshTokenAPI,
  });

  return {
    refreshTokenMutation,
  };
};

export default useAuthMutations;
