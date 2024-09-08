import { useTranslation, UseTranslationResponse } from "react-i18next";

// Define types for namespace and keys
type Namespace = "translation";
type Keys = keyof typeof import("../locales/en/translation.json"); // Adjust the path to your actual translation file

/**
 * Custom hook to provide a common translation hook for all components.
 */
const useCommonTranslation = (): UseTranslationResponse<Namespace, Keys> => {
  // Use the useTranslation hook from react-i18next with the correct types
  const translation = useTranslation<Namespace, Keys>();

  return translation;
};

export default useCommonTranslation;
