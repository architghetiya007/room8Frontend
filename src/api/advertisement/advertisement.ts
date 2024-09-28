import { AdvertisementRequestDTO } from "../../types/advertisement";
import { BaseResponse } from "../../types/comman/BaseResponse";
import { apiPaths } from "../../utils/Comman/apiPaths";
import { getErrorMessage } from "../../utils/Comman/errorHandler";
import axiosInstance from "../axiosInstance";

const createAdvertisementAPI = async (data: AdvertisementRequestDTO) => {
  try {
    const response = await axiosInstance.post<BaseResponse>(
      apiPaths.ADVERTISEMENT.createAdvertisement,
      data
    );
    return response.data;
  } catch (error) {
    getErrorMessage(error);
  }
};

export { createAdvertisementAPI };
