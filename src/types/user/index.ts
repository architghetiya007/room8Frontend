import { BaseResponse } from "../comman/BaseResponse";

export interface RegisterRequestDTO {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface GoogleLoginRequestDTO {
  token: string;
}

export interface ForgotPasswordRequestDTO {
  email: string;
}

export interface ResetPasswordRequestDTO {
  token: string;
  newPassword: string;
}

export interface ChangePasswordRequestDTO {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateProfileRequestDTO {
  fullName: string;
  phoneNumber?: string;
  profilePic?: string;
}

export interface RefreshTokenRequestDTO {
  refreshToken: string;
}

export interface SendOtpRequestDTO {
  phoneNo: string;
}

export interface VerifyOtpRequestDTO {
  OTP: string;
}

export interface UserResponseDTO {
  email: string;
  fullName: string;
  isEmailVerify: boolean;
  isPhoneVerify: boolean;
  refreshToken: string;
  profilePic: string;
  _id: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponseDTO extends BaseResponse {
  data: {
    token: string;
    user: UserResponseDTO;
  };
}

export interface ImageUploadResponseDTO extends BaseResponse {
  data: string[];
}

export interface UpdateProfileResponseDTO extends BaseResponse {
  data: UserResponseDTO;
}

export interface verifyOtpResponseDTO extends BaseResponse {
  data: UserResponseDTO;

}

