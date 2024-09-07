import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSlice } from "../../types/slices/userState";
import { AuthStorage, getUserFromStorage } from "../../utils/Comman/auth";
import { LoginResponseDTO } from "../../types/user";
import { AuthStorageDTO } from "../../types/comman/Auth";
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
      state.refreshToken = "";
      state.token = "";
      state.user = null;
    },
  },
});
export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
