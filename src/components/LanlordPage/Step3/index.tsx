import { Grid } from "@mui/material";
import React from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
const landlordSchema = Yup.object().shape({
  whoAreYou: Yup.string().required("Who are you is required"),
  name: Yup.string().required("Name is required"),
  age: Yup.number().required("Age is required").min(0),
  haveAnychildren: Yup.boolean().required("Have any children is required"),
  havePet: Yup.boolean().required("Have pet is required"),
  typeOfEmployment: Yup.string().required("Type of employment is required"),
  doYouSmoke: Yup.string().required("Do you smoke is required"),
  descriptionAbout: Yup.string().required("Description about is required"),
  flatmateAccepting: Yup.array().of(
    Yup.string().required("Flatmate accepting value is required")
  ),
  ageOfFutureRoomMate: Yup.array()
    .of(Yup.number().required("Age of future roommate is required"))
    .min(1, "At least one age value is required"),
  acceptTenantWithChilder: Yup.string().required(
    "Accept tenant with children is required"
  ),
  acceptPets: Yup.string().required("Accept pets is required"),
  acceptSmoking: Yup.string().required("Accept smoking is required"),
  flatmatePhoto: Yup.string().required("Flatmate photo URL is required"),
  profilePhoto: Yup.string().required("Profile photo URL is required"),
  genderOfCurrentTenants: Yup.string().required(
    "Gender of current tenants is required"
  ),
  currentTenantsName: Yup.string().required(
    "Current tenant's name is required"
  ),
  ageOfCurrentTenants: Yup.number()
    .required("Age of current tenants is required")
    .min(0),
  doChildrenLiveHere: Yup.boolean().required(
    "Do children live here is required"
  ),
  isPetLivingInApartment: Yup.boolean().required(
    "Is pet living in apartment is required"
  ),
  currentTenantsEmployment: Yup.string().required(
    "Current tenant's employment is required"
  ),
  tenantsSmoking: Yup.string().required("Tenants smoking is required"),
  preferenceOfFutureTenants: Yup.array().of(
    Yup.string().required("Preference of future tenant is required")
  ),
  ageRangeOfFutureRoommate: Yup.array()
    .of(Yup.number().required("Age range of future roommate is required"))
    .min(1, "At least one age range value is required"),
  acceptTenantWithChildren: Yup.string().required(
    "Accept tenant with children is required"
  ),
  tenantAcceptPets: Yup.string().required("Tenant accepts pets is required"),
});
interface Step3Props {
  updateTabIndex: Function;
}
const Step3: React.FC<Step3Props> = () => {
  return (
    <Grid container spacing={2} mt={2} mb={2}>
      <Grid item xs={12}></Grid>
    </Grid>
  );
};
export default Step3;
