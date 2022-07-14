import TextField from "@mui/material/TextField";

interface EmailFieldProps {
  email: string;
  setEmail: (email: string) => void;
  isLoading: boolean;
}

const EmailField = ({ email, setEmail, isLoading }: EmailFieldProps) => (
  <TextField
    id="email"
    aria-describedby="email-text"
    disabled={isLoading}
    required
    fullWidth
    autoComplete="email"
    label="Email address"
    value={email}
    onChange={(event: any) => {
      const target = event.target as HTMLInputElement;
      setEmail(target.value);
    }}
  />
);

export default EmailField;
