import { BaseResponse } from "../../types/comman/BaseResponse";
import {
  ChangePasswordRequestDTO,
  ForgotPasswordRequestDTO,
  GoogleLoginRequestDTO,
  ImageUploadResponseDTO,
  LoginRequestDTO,
  LoginResponseDTO,
  RegisterRequestDTO,
  ResetPasswordRequestDTO,
  SendOtpRequestDTO,
  UpdateProfileRequestDTO,
  UpdateProfileResponseDTO,
  VerifyOtpRequestDTO,
  verifyOtpResponseDTO,
} from "../../types/user";
import { apiPaths } from "../../utils/Comman/apiPaths";
import { getErrorMessage } from "../../utils/Comman/errorHandler";
import axiosInstance from "../axiosInstance";

const registerUserAPI = async (data: RegisterRequestDTO) => {
  try {
    const response = await axiosInstance.post<LoginResponseDTO>(
      apiPaths.USER.register,
      data
    );
    return response.data;
  } catch (error) {
    getErrorMessage(error);
  }
};

const loginUserAPI = async (data: LoginRequestDTO) => {
  try {
    const response = await axiosInstance.post<LoginResponseDTO>(
      apiPaths.USER.login,
      data
    );
    return response.data;
  } catch (error) {
    getErrorMessage(error);
  }
};

const googleLoginAPI = async (data: GoogleLoginRequestDTO) => {
  try {
    const response = await axiosInstance.post<LoginResponseDTO>(
      apiPaths.USER.googleLogin,
      data
    );
    return response.data;
  } catch (error) {
    getErrorMessage(error);
  }
};

const forgotPasswordAPI = async (data: ForgotPasswordRequestDTO) => {
  try {
    const response = await axiosInstance.post(
      apiPaths.USER.forgotPassword,
      data
    );
    return response.data;
  } catch (error) {
    getErrorMessage(error);
  }
};

const resetPasswordAPI = async (data: ResetPasswordRequestDTO) => {
  try {
    const response = await axiosInstance.post(
      apiPaths.USER.resetPassword,
      data
    );
    return response.data;
  } catch (error) {
    getErrorMessage(error);
  }
};

const changePasswordAPI = async (data: ChangePasswordRequestDTO) => {
  try {
    const response = await axiosInstance.put(
      apiPaths.USER.changePassword,
      data
    );
    return response.data;
  } catch (error) {
    getErrorMessage(error);
  }
};

const updateProfileAPI = async (data: UpdateProfileRequestDTO) => {
  try {
    const response = await axiosInstance.put<UpdateProfileResponseDTO>(
      apiPaths.USER.updateProfile,
      data
    );
    return response.data;
  } catch (error) {
    getErrorMessage(error);
  }
};

const deleteAccountAPI = async () => {
  try {
    const response = await axiosInstance.put<BaseResponse>(
      apiPaths.USER.deleteAccount
    );
    return response.data;
  } catch (error) {
    getErrorMessage(error);
  }
};

const logoutAPI = async () => {
  try {
    const response = await axiosInstance.put<BaseResponse>(
      apiPaths.USER.logout
    );
    return response.data;
  } catch (error) {
    getErrorMessage(error);
  }
};

const uploadImageAPI = async (data: FormData) => {
  try {
    const response = await axiosInstance.post<ImageUploadResponseDTO>(
      apiPaths.USER.imageUpload,
      data
    );
    return response.data;
  } catch (error) {
    getErrorMessage(error);
  }
};

const sendOtpAPI = async (data: SendOtpRequestDTO) => {
  try {
    const response = await axiosInstance.put<BaseResponse>(
      apiPaths.USER.sendOtp,
      data
    );
    return response.data;
  } catch (error) {
    getErrorMessage(error);
  }
};

const verifyOtpAPI = async (data: VerifyOtpRequestDTO) => {
  try {
    const response = await axiosInstance.put<verifyOtpResponseDTO>(
      apiPaths.USER.verifyOtp,
      data
    );
    return response.data;
  } catch (error) {
    getErrorMessage(error);
  }
};

export {
  registerUserAPI,
  loginUserAPI,
  googleLoginAPI,
  forgotPasswordAPI,
  resetPasswordAPI,
  changePasswordAPI,
  updateProfileAPI,
  deleteAccountAPI,
  logoutAPI,
  uploadImageAPI,
  sendOtpAPI, 
  verifyOtpAPI
};
