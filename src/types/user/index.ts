import { BaseResponse } from "../comman/BaseResponse";

export interface RegisterRequestDTO {
  name: string;
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

export interface UserResponseDTO {
  email: string;
}

export interface LoginResponseDTO extends BaseResponse {
  data: {
    token: string;
    user: UserResponseDTO;
  };
}
