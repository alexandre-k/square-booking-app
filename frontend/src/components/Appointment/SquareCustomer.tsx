// import { useForm, Controller, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { User } from "types/Customer";
import "./SquareCustomer.css";

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
    <div id="customerContainer">
      <form onSubmit={onSubmit}>
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
      </form>
    </div>
  );
};

export default SquareCustomer;
