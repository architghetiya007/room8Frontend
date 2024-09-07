import { UserResponseDTO } from "../../user";

export interface AuthStorageDTO {
  token: string;
  refreshToken: string;
  user: UserResponseDTO
}
