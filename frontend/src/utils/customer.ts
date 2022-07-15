import * as Yup from "yup";

export const customerSchema = Yup.object({
  familyName: Yup.string()
    .max(30, "Must be 30 characters or less")
    .required("Required"),
  givenName: Yup.string()
    .max(30, "Must be 30 characters or less")
    .required("Required"),
  emailAddress: Yup.string()
    .email("Invalid email address")
    .required("Required"),
});
