import { useMutation } from "@tanstack/react-query";
import {
  createAdvertisementAPI,
  getAdvertisementAPI,
  getAllAdvertisementAPI,
  getUserAdvertisementAPI,
  updateAdvertisementAPI,
  updateStatusAdvertisementAPI,
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

  const updateStatusAdvertisementMutation = useMutation({
    mutationFn: updateStatusAdvertisementAPI,
  });

  const getUserAdvertisementMutation = useMutation({
    mutationFn: getUserAdvertisementAPI,
  });

  return {
    createAdvertisementMutation,
    getAdvertisementMutation,
    updateAdvertisementMutation,
    getAllAdvertisementMutation,
    updateStatusAdvertisementMutation,
    getUserAdvertisementMutation,
  };
};

export default useAdvertisementMutations;
