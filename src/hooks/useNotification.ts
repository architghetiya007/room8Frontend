import { useSnackbar } from "notistack";
type SnackBarVariant = "success" | "error" | "info" | "warning";
interface SnackBarProps {
  message: string;
  variant?: SnackBarVariant;
}
const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showSnackBar = ({ message, variant = "success" }: SnackBarProps) => {
    enqueueSnackbar(message, { variant: variant });
  };
  return { showSnackBar };
};

export default useNotification;
