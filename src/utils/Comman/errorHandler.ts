import { AxiosError } from "axios";
interface ApiError {
  message: string;
  statusCode?: number;
}
export const getErrorMessage = (error: AxiosError<ApiError>): string => {
  let getErrorMessage: string = "";
  if (error.response && error.response.data && error.response.data?.message) {
    getErrorMessage =
      error.response.data.message || "An unexpected error occurred";
  }
  throw new Error(getErrorMessage);
};
