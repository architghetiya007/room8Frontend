import axios from "axios";
import { AuthStorage } from "../utils/Comman/auth";
import useAuthMutations from "../mutations/auth";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from the local storage
    const token = localStorage.getItem(AuthStorage.TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Return the response if successful
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const token = localStorage.getItem(AuthStorage.TOKEN);
    if (error.response?.status === 401 && !originalRequest._retry && token) {
      originalRequest._retry = true; // Prevent infinite loops

      try {
        // Use the refresh token hook to refresh the token
        const { refreshTokenMutation } = useAuthMutations();
        const refreshToken = localStorage.getItem(AuthStorage.REFRESHTOKEN); // Replace with your refresh token storage logic

        await refreshTokenMutation.mutateAsync({
          refreshToken: refreshToken ?? "",
        });

        // Retry the original request with the new access token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token error", refreshError);
        // Optionally redirect to login or handle as needed
        // window.location.href = '/login'; // Example redirection
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
