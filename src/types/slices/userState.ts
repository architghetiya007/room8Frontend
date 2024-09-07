import { UserResponseDTO } from "../user";

export interface UserSlice {
    token: string;
    refreshToken: string;
    user: UserResponseDTO | null
}