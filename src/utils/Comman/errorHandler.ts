export const getErrorMessage = (error: any): string => {
  let getErrorMessage: string = "";
  if (error.response && error.response.data && error.response.data?.message) {
    getErrorMessage =
      error.response.data.message || "An unexpected error occurred";
  }
  throw new Error(getErrorMessage);
};
