import {
  AdvertisementRequestDTO,
  AdvertisementResponseDTO,
  ListAdvertisementResponseDTO,
} from "../../types/advertisement";
import { apiPaths } from "../../utils/Comman/apiPaths";
import { getErrorMessage } from "../../utils/Comman/errorHandler";
import axiosInstance from "../axiosInstance";

const createAdvertisementAPI = async (data: AdvertisementRequestDTO) => {
  try {
    const response = await axiosInstance.post<AdvertisementResponseDTO>(
      apiPaths.ADVERTISEMENT.createAdvertisement,
      data
    );
    return response.data;
  } catch (error) {
    getErrorMessage(error);
  }
};

const updateAdvertisementAPI = async (
  advertisementId: string,
  data: AdvertisementRequestDTO
) => {
  try {
    const response = await axiosInstance.put<AdvertisementResponseDTO>(
      apiPaths.ADVERTISEMENT.updateAdvertisement + advertisementId,
      data
    );
    return response.data;
  } catch (error) {
    getErrorMessage(error);
  }
};

const getAdvertisementAPI = async (advertisementId: string) => {
  try {
    const response = await axiosInstance.get<AdvertisementResponseDTO>(
      apiPaths.ADVERTISEMENT.getAdvertisement + advertisementId
    );
    return response.data;
  } catch (error) {
    getErrorMessage(error);
  }
};

const getAllAdvertisementAPI = async () => {
  try {
    const response = await axiosInstance.get<ListAdvertisementResponseDTO>(
      apiPaths.ADVERTISEMENT.getAllAdvertisement
    );
    return response.data;
  } catch (error) {
    getErrorMessage(error);
  }
};

export {
  createAdvertisementAPI,
  updateAdvertisementAPI,
  getAdvertisementAPI,
  getAllAdvertisementAPI,
};
