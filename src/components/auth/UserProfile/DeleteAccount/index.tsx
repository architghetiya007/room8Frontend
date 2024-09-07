import { LoadingButton } from "@mui/lab";
import { Grid, Typography } from "@mui/material";
import React from "react";

const DeleteAccount: React.FC = () => {
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
      <Grid item xs={12} textAlign={'start'}>
        <LoadingButton
          loading={false}
          sx={{
            p: 1,
            borderRadius: 0,
            lineHeight: 1,
            color: "custom.darkRed",
            textTransform: "none",
            letterSpacing: "1px",
            fontWeight: "600",
            fontSize: "18px",
            borderBottom: '1px solid',
            borderColor: 'custom.darkRed'
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
