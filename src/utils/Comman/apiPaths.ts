export const apiPaths = {
  USER: {
    register: "/user/register",
    login: "/user/login",
    googleLogin: "/user/google-login",
    forgotPassword: "/user/forgot-password",
    changePassword: "/user/change-password",
    resetPassword: "/user/reset-password",
    updateProfile: "/user/update-profile",
    deleteAccount: "/user/delete-account",
    logout: "/user/logout",
    imageUpload: "/user/image-upload",
    refreshToken: "/user/refresh-token",
    sendOtp: "/user/send-otp",
    verifyOtp: "/user/verify-otp",
    verifyEmail: "/user/verify-email",
  },
  ADVERTISEMENT: {
    createAdvertisement: "/advertisement",
    updateAdvertisement: "/advertisement/",
    getAdvertisement: "/advertisement/advertisement/",
    getAllAdvertisement: "/advertisement/all",
    updateStatusAdvertisement: "/advertisement/status",
    getUserAdvertisement: "/advertisement/user-wise-list",
    deleteAdvertisement: (advertisementId: string)=> `/advertisement/${advertisementId}`,
    getCities: "/advertisement/top-cities"
  },
};
