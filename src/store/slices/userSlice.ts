import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSlice } from "../../types/slices/userState";
import {
  AuthStorage,
  getUserFromStorage,
  removeTokenDetails,
} from "../../utils/Comman/auth";
import { AuthStorageDTO } from "../../types/comman/Auth";
import { UserResponseDTO } from "../../types/user";
const initialState: UserSlice = {
  token: localStorage.getItem(AuthStorage.TOKEN) ?? "",
  refreshToken: localStorage.getItem(AuthStorage.REFRESHTOKEN) ?? "",
  user: getUserFromStorage(),
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<AuthStorageDTO>) => {
      state.refreshToken = action.payload.refreshToken;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    clearUserInfo: (state) => {
      removeTokenDetails();
      state.refreshToken = "";
      state.token = "";
      state.user = null;
    },
    updateUserInfo: (state, action: PayloadAction<UserResponseDTO>) => {
      state.user = action.payload;
      localStorage.setItem(AuthStorage.USER, JSON.stringify(action.payload));
    },
  },
});
export const { setUserInfo, clearUserInfo, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;
