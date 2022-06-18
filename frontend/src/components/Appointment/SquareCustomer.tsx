// import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { User } from "types/Customer";

interface CustomerProps {
  customer: User;
  setCustomer: (customer: User) => void;
}

const SquareCustomer = ({ customer, setCustomer }: CustomerProps) => {
  /* const validateCustomer = Yup.object({
   *   firstName: Yup.string()
   *     .max(30, "Must be 30 characters or less")
   *     .required("Required"),
   *   lastName: Yup.string()
   *     .max(30, "Must be 30 characters or less")
   *     .required("Required"),
   *   email: Yup.string().email("Invalid email address").required("Required"),
   * }); */

  const onSubmit = async (e: any) => {
    e.preventDefault();
    // setCustomer({ givenName, familyName, emailAddress });
  };
  return (
    <form onSubmit={onSubmit}>
      <Grid container>
        <TextField
          required
          fullWidth
          autoComplete="given-name"
          label="First name"
          helperText="First name"
          value={customer.givenName}
          onChange={(e: any) =>
            setCustomer({ ...customer, givenName: e.target.value })
          }
        />
        <TextField
          required
          fullWidth
          autoComplete="family-name"
          label="Last name"
          helperText="Last name"
          value={customer.familyName}
          onChange={(e: any) =>
            setCustomer({ ...customer, familyName: e.target.value })
          }
        />
        <TextField
          required
          fullWidth
          autoComplete="email"
          label="Email address"
          helperText="Email address"
          value={customer.emailAddress}
          onChange={(e: any) =>
            setCustomer({ ...customer, emailAddress: e.target.value })
          }
        />
      </Grid>
    </form>
  );
};

export default SquareCustomer;
