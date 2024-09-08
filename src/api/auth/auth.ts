import { RefreshTokenRequestDTO } from "../../types/user";
import { apiPaths } from "../../utils/Comman/apiPaths";
import { getErrorMessage } from "../../utils/Comman/errorHandler";
import axiosInstance from "../axiosInstance";

const refreshTokenAPI = async (data: RefreshTokenRequestDTO) => {
  try {
    const response = await axiosInstance.put(apiPaths.USER.refreshToken, data);
    return response.data;
  } catch (error) {
    getErrorMessage(error);
  }
};

export { refreshTokenAPI };
