import { User } from "types/Customer";
import CheckYourEmail from "components/Auth/CheckYourEmail";
import EmailConfirmed from "components/Auth/EmailConfirmed";
import CustomerField from "components/Booking/CustomerField";
import "./Customer.css";

interface CustomerProps {
  customer: User;
  setCustomer: (customer: User) => void;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  hasSavedMetadata: boolean;
}

const Customer = ({ customer, setCustomer, isAuthenticated, isAuthLoading, hasSavedMetadata }: CustomerProps) => {

  return (
    <form id="customerContainer">
      <CustomerField
        autoComplete="given-name"
        label="First name"
        value={customer.givenName}
        onChange={(e: any) =>
          setCustomer({ ...customer, givenName: e.target.value })
        }
      />
      <CustomerField
        autoComplete="family-name"
        label="Last name"
        value={customer.familyName}
        onChange={(e: any) =>
          setCustomer({ ...customer, familyName: e.target.value })
        }
      />
      <CustomerField
        disabled={isAuthenticated}
        autoComplete="email"
        label="Email address"
        type="email"
        value={customer.emailAddress}
        onChange={(e: any) =>
          setCustomer({ ...customer, emailAddress: e.target.value })
        }
      />
      {isAuthLoading && !isAuthenticated && (
        <CheckYourEmail email={customer.emailAddress} />
      )}
      {!hasSavedMetadata && isAuthenticated && (
        <EmailConfirmed email={customer.emailAddress} />
      )}
    </form>
  );
};

export default Customer;
