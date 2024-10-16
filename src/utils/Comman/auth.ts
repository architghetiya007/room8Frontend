import { AuthStorageDTO } from "../../types/comman/Auth";

export enum AuthStorage {
  TOKEN = "token",
  REFRESHTOKEN = "refreshToken",
  USER = "user",
  EMAIL = "QERTYUIABN",
  PASSWORD = "BYIOQMELKP"
}
export const storeTokenDetails = (data: AuthStorageDTO) => {
  localStorage.setItem(AuthStorage.TOKEN, data.token);
  localStorage.setItem(AuthStorage.REFRESHTOKEN, data.refreshToken);
  localStorage.setItem(AuthStorage.USER, JSON.stringify(data.user));
};

export const storeRefreshTokenDetails = (data: AuthStorageDTO) => {
  localStorage.setItem(AuthStorage.TOKEN, data.token);
  localStorage.setItem(AuthStorage.REFRESHTOKEN, data.refreshToken);
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

export const encodeToBase64 = (str: string) => {
  return btoa(unescape(encodeURIComponent(str)));
};

// Function to decode a Base64 string
export const decodeFromBase64 = (base64: string) => {
  return decodeURIComponent(escape(atob(base64)));
};
