// import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useMagicLogin } from "context/MagicLoginProvider";
import TextField from "@mui/material/TextField";
import { User } from "types/Customer";
import CheckYourEmail from "components/Auth/CheckYourEmail";
import EmailConfirmed from "components/Auth/EmailConfirmed";
import EmailField from "components/Auth/EmailField";
import "./Customer.css";

interface CustomerProps {
  customer: User;
  setCustomer: (customer: User) => void;
}

const Customer = ({ customer, setCustomer }: CustomerProps) => {
  const {
    isLoading: isAuthLoading,
    isAuthenticated,
    error: authError,
    user,
    login,
  } = useMagicLogin();
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
    <form id="customerContainer" onSubmit={onSubmit}>
      <TextField
        className="textField"
        required
        fullWidth
        autoComplete="given-name"
        label="First name"
        value={customer.givenName}
        onChange={(e: any) =>
          setCustomer({ ...customer, givenName: e.target.value })
        }
      />
      <TextField
        className="textField"
        required
        fullWidth
        autoComplete="family-name"
        label="Last name"
        value={customer.familyName}
        onChange={(e: any) =>
          setCustomer({ ...customer, familyName: e.target.value })
        }
      />
      <TextField
        className="textField"
        required
        fullWidth
        autoComplete="email"
        label="Email address"
        value={customer.emailAddress}
        onChange={(e: any) =>
          setCustomer({ ...customer, emailAddress: e.target.value })
        }
      />
      {(isAuthLoading || !isAuthenticated) && <CheckYourEmail email={customer.emailAddress} />}
      {isAuthenticated && <EmailConfirmed email={customer.emailAddress} />}
    </form>
  );
};

export default Customer;
