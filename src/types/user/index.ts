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
