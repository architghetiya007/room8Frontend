import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface ConfirmationDialogProps {
  open: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean; // Optional prop to control loading state
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  title = "Confirmation",
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
}) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: 8, // Adjust border radius here
          px: {
            md: 2,
          }, // Padding inside the dialog
          py: 1,
          scrollbarWidth: "none",
          m: {
            xs: 0,
          },
        },
      }}
    >
      <DialogTitle
        variant="h5"
        fontWeight={"bold"}
        id="confirmation-dialog-title"
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography id="confirmation-dialog-description">{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button type="button" onClick={onCancel} color="secondary">
          {cancelText}
        </Button>
        <LoadingButton
          type="button"
          onClick={onConfirm}
          loading={isLoading}
          variant="contained"
          sx={{
            background:
              "linear-gradient(to right, #4AB1F1, #566CEC, #D749AF, #FF7C51)",
            color: "#fff",
            "&:hover": {
              background:
                "linear-gradient(to right, #4AB1F1, #566CEC, #D749AF, #FF7C51)",
              opacity: 0.9,
            },
            pl: 2,
            pr: 2,
            borderRadius: "8px",
            textTransform: "none",
            letterSpacing: "1px",
            fontWeight: "600",
            fontSize: "18px",
            minWidth: "100px",
          }}
        >
          {confirmText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
