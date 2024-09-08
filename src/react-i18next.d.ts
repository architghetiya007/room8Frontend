import "react-i18next";

// Import the type of your translation JSON files
import enTranslation from "../locales/en/translation.json"; // Adjust the path

// Define the type for your resources
type DefaultNamespace = typeof enTranslation;

// Extend the i18next module
declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation"; // Set your default namespace
    resources: {
      translation: DefaultNamespace;
    };
  }
}
