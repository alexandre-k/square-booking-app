import { useState } from "react";
// import { useForm, Controller, SubmitHandler } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Customer } from "types/Customer";
import { sendRequest } from "utils/request";

interface CustomerProps {
  setCustomerId: (customerId: string) => void;
}

const SquareCustomer = (props: CustomerProps) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    /* const validateCustomer = Yup.object({
     *   firstName: Yup.string()
     *     .max(30, "Must be 30 characters or less")
     *     .required("Required"),
     *   lastName: Yup.string()
     *     .max(30, "Must be 30 characters or less")
     *     .required("Required"),
     *   email: Yup.string().email("Invalid email address").required("Required"),
     * }); */

  const getCustomerByEmail = async (
    given_name: string,
    family_name: string,
    email_address: string
  ): Promise<Customer> => {
    const data = await sendRequest({
      url: "/customers/search",
      method: "POST",
      payload: {
        query: {
          filter: {
            email_address: {
              exact: email_address,
            },
          },
        },
      },
    });
    if (data.customers && data.customers.length > 0) {
      return data.customers[0];
    } else {
      return await createCustomer(given_name, family_name, email_address);
    }
  };

  const createCustomer = async (
    given_name: string,
    family_name: string,
    email_address: string
  ) => {
    const data = await sendRequest({
      url: "/customers",
      method: "POST",
      payload: {
        given_name,
        family_name,
        email_address,
      },
    });
    return data.customer ? data.customer : null;
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
      setLoading(true);
    // look for a customer already created, create if not already there
    // TODO: use OAuth
    const customer = await getCustomerByEmail(firstName, lastName, email);
      setLoading(false);
    if (customer !== null) {
      props.setCustomerId(customer.id);
    } else {
      console.log("TODO: show error. Unable to find or register. Verify email address.");
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            autoComplete="given-name"
            label="First name"
            helperText="First name"
            value={firstName}
            onChange={(e: any) => setFirstName(e.target.value)}
          />
          <TextField
            required
            fullWidth
            autoComplete="family-name"
            label="Last name"
            helperText="Last name"
            value={lastName}
            onChange={(e: any) => setLastName(e.target.value)}
          />
          <TextField
            required
            fullWidth
            autoComplete="email"
            label="Email address"
            helperText="Email address"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <LoadingButton loading={loading} variant="contained" type="submit" onClick={onSubmit}>
            Ok
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default SquareCustomer;
