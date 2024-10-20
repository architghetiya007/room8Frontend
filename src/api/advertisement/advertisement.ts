import {
  AdvertisementRequestDTO,
  AdvertisementResponseDTO,
  AdvertisementStatusRequestDTO,
  ListAdvertisementResponseDTO,
} from "../../types/advertisement";
import { BaseResponse } from "../../types/comman/BaseResponse";
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
    const response = await axiosInstance.post<ListAdvertisementResponseDTO>(
      apiPaths.ADVERTISEMENT.getAllAdvertisement,
    );
    return response.data;
  } catch (error) {
    getErrorMessage(error);
  }
};

const updateStatusAdvertisementAPI = async (
  data: AdvertisementStatusRequestDTO
) => {
  try {
    const response = await axiosInstance.put<AdvertisementResponseDTO>(
      apiPaths.ADVERTISEMENT.updateStatusAdvertisement,
      data
    );
    return response.data;
  } catch (error) {
    getErrorMessage(error);
  }
};

const getUserAdvertisementAPI = async () => {
  try {
    const response = await axiosInstance.post<ListAdvertisementResponseDTO>(
      apiPaths.ADVERTISEMENT.getUserAdvertisement,
      {limit: -1}
    );
    return response.data;
  } catch (error) {
    getErrorMessage(error);
  }
};

const deleteAdvertisementAPI = async (advertisementId: string) => {
  try {
    const response = await axiosInstance.delete<BaseResponse>(
      apiPaths.ADVERTISEMENT.deleteAdvertisement(advertisementId),
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
  updateStatusAdvertisementAPI,
  getUserAdvertisementAPI,
  deleteAdvertisementAPI
};
