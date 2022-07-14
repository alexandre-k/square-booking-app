import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

interface CheckYourEmailProps {
  email: string;
}

const CheckYourEmail = ({ email }: CheckYourEmailProps) => (
  <Alert severity="info">
    <AlertTitle>Check your mailbox</AlertTitle>A mail has been sent to
    <i>{email}</i> to authorize you access to your bookings.
  </Alert>
);

export default CheckYourEmail;
