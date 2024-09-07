import { AuthStorageDTO } from "../../types/comman/Auth";

export enum AuthStorage {
  TOKEN = "token",
  REFRESHTOKEN = "refreshToken",
  USER = "user",
}
export const storeTokenDetails = (data: AuthStorageDTO) => {
  localStorage.setItem(AuthStorage.TOKEN, data.token);
  localStorage.setItem(AuthStorage.REFRESHTOKEN, data.refreshToken);
  localStorage.setItem(AuthStorage.USER, JSON.stringify(data.user));
};

export const removeTokenDetails = () => {
  localStorage.removeItem(AuthStorage.TOKEN);
  localStorage.removeItem(AuthStorage.REFRESHTOKEN);
  localStorage.removeItem(AuthStorage.USER);
};

export const getUserFromStorage = () => {
  const userData = localStorage.getItem(AuthStorage.USER);
  return userData ? JSON.parse(userData) : null;
};
