import {
  GoogleLoginRequestDTO,
  LoginRequestDTO,
  RegisterRequestDTO,
} from "../../types/user";
import { apiPaths } from "../../utils/Comman/apiPaths";
import { getErrorMessage } from "../../utils/Comman/errorHandler";
import axiosInstance from "../axiosInstance";

const registerUserAPI = async (data: RegisterRequestDTO) => {
  try {
    const response = await axiosInstance.post(apiPaths.USER.register, data);
    return response.data;
  } catch (error) {
    getErrorMessage(error);
  }
};

const loginUserAPI = async (data: LoginRequestDTO) => {
  try {
    const response = await axiosInstance.post(apiPaths.USER.login, data);
    return response.data;
  } catch (error) {
    getErrorMessage(error);
  }
};

const googleLoginAPI = async (data: GoogleLoginRequestDTO) => {
  try {
    const response = await axiosInstance.post(apiPaths.USER.googleLogin, data);
    return response.data;
  } catch (error) {
    getErrorMessage(error);
  }
};

export { registerUserAPI, loginUserAPI, googleLoginAPI };
