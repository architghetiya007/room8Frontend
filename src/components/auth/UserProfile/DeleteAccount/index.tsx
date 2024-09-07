import { LoadingButton } from "@mui/lab";
import { Grid, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../../../store";
import useNotification from "../../../../hooks/useNotification";
import useUserMutations from "../../../../mutations/user";
import { clearUserInfo } from "../../../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { apiMessages } from "../../../../utils/Comman/apiMessages";

const DeleteAccount: React.FC = () => {
  const dispatch = useAppDispatch();
  const { showSnackBar } = useNotification();
  const navigate = useNavigate();
  const { deleteAccountUserMutation } = useUserMutations();

  const deleteAccount = () => {
    deleteAccountUserMutation.mutate(undefined, {
      onSuccess: (data) => {
        dispatch(clearUserInfo());
        navigate("/");
        showSnackBar({
          message: data?.message ?? apiMessages.USER.deleteAccount,
        });
      },
      onError: (error: Error) => {
        showSnackBar({ message: error.message, variant: "error" });
      },
    });
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Deleting Your Account</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2" sx={{ color: "gray" }}>
          Deleting your account is an irreversible process and results in the
          permanent deletion of all your data.
        </Typography>
      </Grid>
      <Grid item xs={12} textAlign={"start"}>
        <LoadingButton
          onClick={() => deleteAccount()}
          loading={deleteAccountUserMutation.isPending}
          sx={{
            p: 1,
            borderRadius: 0,
            lineHeight: 1,
            color: "custom.darkRed",
            textTransform: "none",
            letterSpacing: "1px",
            fontWeight: "600",
            fontSize: "18px",
            borderBottom: "1px solid",
            borderColor: "custom.darkRed",
          }}
          type="button"
        >
          Delete Account
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default DeleteAccount;
