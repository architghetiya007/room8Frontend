import axios from "axios";
import { AuthStorage } from "../utils/Comman/auth";
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
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear auth data and redirect to login
      //   clearAuthData();
      // const navigate = useNavigate();
      // navigate("/login"); // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
