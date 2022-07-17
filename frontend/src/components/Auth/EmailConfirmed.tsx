import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

interface EmailConfirmedProps {
  email: string;
}

const EmailConfirmed = ({ email }: EmailConfirmedProps) => (
  <Alert severity="info">
    <AlertTitle>Email Confirmed</AlertTitle>Thank you for confirming your email{" "}
    <i>{email}</i>! We will use this address only to authorize you to manage
    your bookings.
  </Alert>
);

export default EmailConfirmed;
