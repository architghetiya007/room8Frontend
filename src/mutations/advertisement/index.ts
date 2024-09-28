import { useMutation } from "@tanstack/react-query";
import { createAdvertisementAPI } from "../../api/advertisement/advertisement";

const useAdvertisementMutations = () => {
  const createAdvertisementMutation = useMutation({
    mutationFn: createAdvertisementAPI,
  });

  return {
    createAdvertisementMutation,
  };
};

export default useAdvertisementMutations;
