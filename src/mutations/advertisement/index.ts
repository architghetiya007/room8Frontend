import { useMutation } from "@tanstack/react-query";
import {
  createAdvertisementAPI,
  getAdvertisementAPI,
  getAllAdvertisementAPI,
  updateAdvertisementAPI,
} from "../../api/advertisement/advertisement";
import { AdvertisementRequestDTO } from "../../types/advertisement";

const useAdvertisementMutations = () => {
  const createAdvertisementMutation = useMutation({
    mutationFn: createAdvertisementAPI,
  });

  const updateAdvertisementMutation = useMutation({
    mutationFn: ({
      advertisementId,
      data,
    }: {
      advertisementId: string;
      data: AdvertisementRequestDTO;
    }) => updateAdvertisementAPI(advertisementId, data),
  });

  const getAdvertisementMutation = useMutation({
    mutationFn: (advertisementId: string) =>
      getAdvertisementAPI(advertisementId),
  });

  const getAllAdvertisementMutation = useMutation({
    mutationFn: getAllAdvertisementAPI,
  });

  return {
    createAdvertisementMutation,
    getAdvertisementMutation,
    updateAdvertisementMutation,
    getAllAdvertisementMutation,
  };
};

export default useAdvertisementMutations;
